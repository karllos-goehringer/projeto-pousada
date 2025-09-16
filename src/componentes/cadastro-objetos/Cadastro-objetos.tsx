import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import estilo from "./Cadastros-objetos.module.css"

interface Objeto {
  comodo: string;
  nome: string;
  marca: string;
  link: string;
  unidades: number;
  imagem: string;
}

interface Props {
  comodos: string[]; // lista de cômodos para o select
}

export default function CadastroObjeto({ comodos }: Props) {
  const [formData, setFormData] = useState<Objeto>({
    comodo: "",
    nome: "",
    marca: "",
    link: "",
    unidades: 1,
    imagem: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unidades" ? Number(value) : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      comodo: "",
      nome: "",
      marca: "",
      link: "",
      unidades: 1,
      imagem: "",
    });
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      comodoId: formData.comodo = '0', 
      objNome: formData.nome,
      objMarca: formData.marca,
      objUnidades: formData.unidades,
      objLink: formData.link,
      objImagem: formData.imagem, // no seu caso está sendo a URL temporária
    };

    const response = await fetch("http://localhost:3000/create-objeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar objeto");
    }

    const data = await response.json();
    alert(`✅ Objeto salvo com sucesso! ID: ${data.id}`);
    handleReset();
  } catch (err) {
    console.error(err);
    alert("❌ Não foi possível salvar o objeto.");
  }
};

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Cria uma URL temporária para exibir no preview
    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imagem: imageUrl,
    }));
  };

  return (
    <div className="container">
      <form className={estilo.card} onSubmit={handleSubmit} onReset={handleReset}>
        <h1>Cadastro de Objetos</h1>

        <div className={estilo.grid} >
          <div className={estilo.field} >
            <label htmlFor="comodo">Cômodo *</label>
            <select
              id="comodo"
              name="comodo"
              required
              value={formData.comodo}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um cômodo
              </option>
              {comodos.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={estilo.field} >
            <label htmlFor="nome">Nome do objeto *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ex.: Cadeira"
              required
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className={estilo.field}>
            <label htmlFor="marca">Marca</label>
            <input
              type="text"
              id="marca"
              name="marca"
              placeholder="Ex.: IKEA"
              value={formData.marca}
              onChange={handleChange}
            />
          </div>

          <div className={estilo.field}>
            <label htmlFor="link">Link de compra</label>
            <input
              type="url"
              id="link"
              name="link"
              placeholder="https://"
              value={formData.link}
              onChange={handleChange}
            />
          </div>

          <div className={estilo.field}>
            <label htmlFor="unidades">Número de unidades</label>
            <input
              type="number"
              id="unidades"
              name="unidades"
              min={1}
              value={formData.unidades}
              onChange={handleChange}
            />
          </div>

          <div className={estilo.field}>
            <label htmlFor="imagem">Imagem</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={estilo.actions}>
          <button type="reset" className="btn ghost">
            Limpar
          </button>
          <button type="submit" className="btn">
            Salvar
          </button>
        </div>

        <p className={estilo.hint}>Os campos com * são obrigatórios.</p>
      </form>

      <section className={estilo.preview}>
        <h2>Pré-visualização do objeto</h2>
        <ul className={estilo.kv}>
          <li>
            <span>Cômodo:</span> {formData.comodo || "-"}
          </li>
          <li>
            <span>Nome:</span> {formData.nome || "-"}
          </li>
          <li>
            <span>Marca:</span> {formData.marca || "-"}
          </li>
          <li>
            <span>Link:</span>{" "}
            {formData.link ? (
              <a href={formData.link} target="_blank" rel="noopener noreferrer">
                {formData.link}
              </a>
            ) : (
              "-"
            )}
          </li>
          <li>
            <span>Unidades:</span> {formData.unidades}
          </li>
          {formData.imagem && (
            <li className={estilo.full}>
              <span>Imagem:</span>
              <img
                src={formData.imagem}
                alt={formData.nome}
                style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "6px" }}
              />
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
