import { createContext, useContext, useEffect, useState } from "react";
import { RotaBackEnd } from "../routes/privateroute";

interface User {
    id: number;
    email: string;
    role?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    auth: boolean;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    setUser: (user: User | null) => void;
    setAuth: (auth: boolean) => void;
    setToken: (token: string | null) => void;
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    auth: false,
    token: null,
    loading: true,
    login: async () => false,
    logout: () => { },
    setUser: () => { },
    setAuth: () => { },
    setToken: () => { }
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        let mounted = true;
        async function verifySession() {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setAuth(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${RotaBackEnd}/auth/verify`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                const headerToken = res.headers.get("X-New-Token");
                const novo = data.token || headerToken;
                if (data.valid && mounted) {
                    if (novo) {
                        localStorage.setItem("token", novo);
                        setToken(novo);
                    }

                    setUser(data.user || null);
                    setAuth(true);
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                    setAuth(false);
                }
            } catch (err) {
                console.error("verify error", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        verifySession();

        return () => {
            mounted = false;
        };
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {   
            const res = await fetch(`${RotaBackEnd}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha: password }),
            });
            const data = await res.json();
            if (!res.ok) {
                return false;
            }
            if (!data.token) {
                return false;
            }
 
            localStorage.setItem("token", data.token);
            localStorage.setItem("authToken", data.token);
            setToken(data.token);
            setUser(data.usuario);
            setAuth(true);
            return true;
        } catch (e) {
            console.error("❌ EXCEPTION IN LOGIN:", e);
            return false;
        }
    };
    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setAuth(false);
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                auth,
                token,
                loading,
                login,
                logout,
                setUser,
                setAuth,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}