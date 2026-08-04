# 🎨 Dinner-Drink — Frontend

Interface Web desenvolvida com **React 19**, **Vite** e **Tailwind CSS v4** para gerenciamento de mesas, itens de cardápio e pedidos do projeto **Dinner-Drink**.

---

## 📌 Visão Geral

O frontend do Dinner-Drink é uma aplicação Single Page Application (SPA) reativa que consome a API RESTful do backend para permitir o acompanhamento e controle das operações de restaurante/bar em tempo real.

### Principais Tecnologias:
- **React 19**: Biblioteca UI reativa.
- **Vite 6**: Bundler e servidor de desenvolvimento ultrarrápido.
- **Tailwind CSS v4**: Framework de estilização via classes utilitárias.
- **ESLint**: Padronização e qualidade de código.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js `18+`
- Gerenciador de pacotes `npm`

### Passos para execução local:

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na pasta `frontend` com base em `.env.exmaple`:
   ```env
   BACKEND_URL=http://localhost:5000
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação estará acessível em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

No diretório `frontend`, você pode executar os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite com HMR. |
| `npm run build` | Compila os arquivos para produção na pasta `dist/`. |
| `npm run preview` | Serve os arquivos compilados de produção para teste local. |
| `npm run lint` | Executa a verificação estática do ESLint no código. |

---

## 📂 Estrutura de Arquivos

```text
frontend/
├── .env.exmaple        # Exemplo de variáveis de ambiente do frontend
├── Dockerfile          # Configuração de build do Docker
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
├── vite.config.js      # Configurações do Vite e plugins
└── src/
    ├── main.jsx        # Ponto de entrada do React
    ├── App.jsx         # Componente raiz da aplicação
    └── index.css       # Estilos globais e importação do Tailwind CSS
```

---

## 🔗 Links Úteis

- 🏠 [Documentação Principal do Repositório](file:///home/julio/Documentos/Projects/Dinner-Drink/README.md)
- ⚙️ [Documentação do Backend](file:///home/julio/Documentos/Projects/Dinner-Drink/backend/README.md)
