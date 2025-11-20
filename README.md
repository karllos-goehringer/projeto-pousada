# Projeto Pousada

Este repositório contém o **frontend** do sistema de cadastro e controle de itens de uma pousada. O objetivo principal do projeto é **facilitar a verificação dos itens após o término de uma estadia**, garantindo mais organização e agilidade no processo de conferência.

### 🏡 Sobre o Projeto

O sistema permite gerenciar itens presentes em quartos ou áreas da pousada, listando, cadastrando e verificando sua integridade. A aplicação conta com uma interface amigável que facilita o trabalho dos funcionários na administração dos itens.

Este projeto é **dependente** do backend disponível neste repositório:

* **API Backend:** [https://github.com/karllos-goehringer/api-projeto-pousada](https://github.com/karllos-goehringer/api-projeto-pousada)

A API é responsável por toda a lógica de negócio, comunicação com o banco de dados e autenticação.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* **ShadCN, Tailwindcss, TypeScript**
* **React + Vite**
* **Consumo da API via Fetch**

### Backend (projeto dependente)

* **Node.js + Express**
* **MySQL**
* **JWT para autenticação**

---

## 📦 Como Rodar o Projeto

### 🔹 1. Clonar os repositórios

```bash
git clone https://github.com/karllos-goehringer/projeto-pousada
git clone https://github.com/karllos-goehringer/api-projeto-pousada
```

---

## ▶️ Frontend (este projeto)

Dentro da pasta `projeto-pousada` rode:

```bash
npm install
npm run dev
```

A aplicação iniciará em: **[http://localhost:5173](http://localhost:5173)** (ou outra porta informada pelo Vite)

---

## 🖥️ Backend (API necessária)

Dentro da pasta `api-projeto-pousada`:

### 1. Instale as dependências

```bash
npm install
```

### 2. Importe o banco de dados

No projeto existe um arquivo `.sql`. Importe-o no seu MySQL (via Workbench, phpMyAdmin ou CLI).

### 3. Configure o arquivo `.env`

Geralmente contém:

```
REFRESH_SECRET=algumrefrest
JWT_SECRET=algumasecret
```

### 4. Inicie o servidor backend

```bash
node ./app.js
```

A API iniciará em: **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 Integração

O frontend foi configurado para consumir as rotas da API. Certifique-se de que:

* O backend está rodando na porta configurada.
* O CORS está habilitado (O CORS já vem configurado como padrão, mas lembre de verificar).
* O arquivo de configuração do frontend aponta corretamente para a URL da API. (inicialmente está em localhost:3000)

---

## ✔️ Pronto!

Com ambos os servidores rodando, o sistema estará funcionando completamente.