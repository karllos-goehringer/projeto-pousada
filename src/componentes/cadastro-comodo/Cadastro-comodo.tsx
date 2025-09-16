import { useState } from "react";
import type { FormEvent, ChangeEvent, JSX } from "react";
import estilo from "./Cadastro-comodo.module.css"

interface FormData {
  nome: string;
  tipo: string;
  capacidade: string;
  status: string;
  descricao: string;
}

export default function CadastroComodo(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "",
    capacidade: "",
    status: "",
    descricao: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      tipo: "",
      capacidade: "",
      status: "",
      descricao: "",
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Cômodo salvo (exemplo sem backend).");
  };

  return (
    <div className={estilo.box}>
      <form className="card" id="form-comodo" onSubmit={handleSubmit} onReset={handleReset}>
        <h1>Cadastro de Cômodos</h1>

        <div className={estilo.grid}>
          <div className={estilo.field}>
            <label htmlFor="nome">Nome do cômodo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ex.: Suíte 101"
              required
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className={estilo.field}>
            <label htmlFor="tipo">Tipo *</label>
            <select
              id="tipo"
              name="tipo"
              required
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option>Quarto</option>
              <option>Suíte</option>
              <option>Sala</option>
              <option>Cozinha</option>
              <option>Banheiro</option>
              <option>Área externa</option>
              <option>Outro</option>
            </select>
          </div>

          <div className={estilo.field}>
            <label htmlFor="capacidade">Capacidade (pessoas)</label>
            <input
              type="number"
              id="capacidade"
              name="capacidade"
              placeholder="Ex.: 3"
              min="0"
              value={formData.capacidade}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={estilo.field}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            rows={4}
            placeholder="Observações, tamanho, vista, etc."
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        <div className={estilo.grid}>
          <div className={estilo.field}>
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option value="disponivel">Disponível</option>
              <option value="ocupado">Ocupado</option>
              <option value="manutencao">Em manutenção</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
      <section className={estilo.card} id="preview" aria-live="polite">
        <h2>Pré-visualização</h2>
        <div className={estilo.preview}>
          <ul className={estilo.kv}>
            <li>
              <span>Nome:</span> {formData.nome || "-"}
            </li>
            <li>
              <span>Tipo:</span> {formData.tipo || "-"}
            </li>
            <li>
              <span>Capacidade:</span> {formData.capacidade || "-"}
            </li>
            <li>
              <span>Status:</span> {formData.status || "-"}
            </li>
            <li className={estilo.full}>
              <span>Descrição:</span> {formData.descricao || "-"}
            </li>
          </ul>
        </div>
      </section>



        <div className={estilo.actions}>
          <button type="reset" className={estilo.apagar}>
            Limpar
          </button>
          <button type="submit" className={estilo.btn}>
            Salvar
          </button>
        </div>

        <p className={estilo.hint}>Os campos com * são obrigatórios.</p>
      </form>

      
    </div>
  );
}
