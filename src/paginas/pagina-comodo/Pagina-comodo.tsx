import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useParams } from "react-router-dom";
import estilo from './Pagina-comodo-css.module.css'
export default function PaginaComodo() {
    const { id: comodoID } = useParams<{ id: string }>();
    
    return (
        <main className={estilo.bodyHome}>
            <AppSidebar />
            <div className=" md:ml-64 p-4 flex min-h-screen w-full">
                <div className={estilo.boxHome}>
                    <div className={estilo.boxPousada}>

                    </div>
                </div>
            </div>
        </main >
    )
}