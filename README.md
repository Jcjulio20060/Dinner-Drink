# 🍽️ Dinner-Drink

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

**Dinner-Drink** é uma solução completa para gerenciamento de estabelecimentos de gastronomia (restaurantes e bares). O sistema permite a administração de mesas, controle de estoque de comidas e bebidas, e o gerenciamento do ciclo de vida dos pedidos em tempo real.

---

## 📌 Sumário

- [Visão Geral e Arquitetura](#-visão-geral-e-arquitetura)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Como Executar](#-como-executar)
  - [Opção 1: Via Docker Compose (Recomendado)](#opção-1-via-docker-compose-recomendado)
  - [Opção 2: Execução Manual Local](#opção-2-execução-manual-local)
- [Documentação Detalhada](#-documentação-detalhada)
- [Licença](#-licença)

---

## 🏗️ Visão Geral e Arquitetura

O projeto adota uma arquitetura em microsserviços/contêineres desacoplada, dividida em três pilares principais:

1. **Frontend**: Interface web reativa construída com React 19, Vite e Tailwind CSS.
2. **Backend**: API RESTful construída em Node.js com Express e ODM Mongoose.
3. **Database**: Banco de dados NoSQL MongoDB para persistência de dados.

```
┌─────────────────┐       HTTP / JSON       ┌─────────────────┐       Mongoose       ┌─────────────────┐
│                 │  ───────────────────>   │                 │  ─────────────────>  │                 │
│    Frontend     │                         │     Backend     │                      │     MongoDB     │
│  (React + Vite) │  <───────────────────   │    (Express)    │  <─────────────────  │   (Database)    │
└─────────────────┘                         └─────────────────┘                      └─────────────────┘
```

Para uma visão aprofundada da arquitetura e fluxo de comunicação entre os contêineres, consulte a [Documentação de Arquitetura](file:///home/julio/Documentos/Projects/Dinner-Drink/docs/ARCHITECTURE.md).

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js**: Ambiente de execução JavaScript servidor.
- **Express 5**: Framework web rápido e minimalista.
- **Mongoose**: ODM para modelagem de dados no MongoDB.
- **CORS & Dotenv**: Gerenciamento de acessos e variáveis de ambiente.

### Frontend

- **React 19**: Biblioteca JavaScript para interfaces de usuário.
- **Vite 6**: Ferramenta de build extremamente rápida.
- **Tailwind CSS v4**: Framework utilitário para estilização CSS.

### Infraestrutura

- **Docker & Docker Compose**: Conteinerização e orquestração dos serviços (`frontend`, `backend` e `db`).

---

## 📁 Estrutura do Repositório

```text
Dinner-Drink/
├── .env.example            # Arquivo de exemplo para variáveis de ambiente globais
├── docker-compose.yaml     # Configuração de orquestração dos serviços Docker
├── README.md               # Documentação principal do repositório
├── docs/                   # Documentação complementar do projeto
│   ├── API.md              # Especificação detalhada de endpoints e rotas REST
│   └── ARCHITECTURE.md     # Diagramas e detalhes da arquitetura do sistema
├── backend/                # Aplicação da API Backend (Node.js/Express)
│   ├── .env.example        # Exemplo de configuração de ambiente do backend
│   ├── Dockerfile          # Instalação e execução do backend via Docker
│   ├── README.md           # Guia de desenvolvimento e especificações do backend
│   ├── package.json        # Dependências e scripts do backend
│   └── src/                # Código-fonte (controllers, models, routes, config)
└── frontend/               # Aplicação Web Frontend (React/Vite)
    ├── .env.exmaple        # Exemplo de configuração de ambiente do frontend
    ├── Dockerfile          # Instalação e compilação do frontend via Docker
    ├── README.md           # Guia do aplicativo frontend
    ├── package.json        # Dependências e scripts do frontend
    └── src/                # Componentes React e estilos
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto ou dentro das respectivas pastas (`backend/` e `frontend/`) utilizando os arquivos `.env.example` como modelo:

### Raiz e Backend (`.env`)

| Variável            | Descrição                         | Valor Padrão                     |
| :------------------ | :-------------------------------- | :------------------------------- |
| `PORT`              | Porta onde o backend irá rodar    | `5000` (Local) / `3000` (Docker) |
| `HOST`              | Host para conexão com a API       | `localhost`                      |
| `MONGO_USER`        | Usuário administrador do MongoDB  | `admin`                          |
| `MONGO_PASSWORD`    | Senha de acesso do MongoDB        | `secret`                         |
| `MONGO_HOST`        | Endereço do host MongoDB          | `127.0.0.1` ou `db` (Docker)     |
| `MONGO_PORT`        | Porta de conexão do MongoDB       | `27017`                          |
| `MONGO_DB`          | Nome do banco de dados            | `dinnerdrink`                    |
| `MONGO_AUTH_SOURCE` | Base de autenticação              | `admin`                          |
| `MONGO_USE_AUTH`    | Habilitar autenticação do MongoDB | `true`                           |

---

## 🚀 Como Executar

### Opção 1: Via Docker Compose (Recomendado)

A forma mais rápida de subir todo o ambiente (Backend, Frontend e Banco de Dados) é utilizando o Docker Compose:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Jcjulio20060/Dinner-Drink.git
   cd Dinner-Drink
   ```

Para parar os serviços, utilize o comando a seguir:

```bash
podman-compose down
```

Para inicializar os outros serviços, entre na pasta de cada um, instale as dependências e execute o comando a seguir:

Para instalar as dependências

```bash
npm install
```

Para iniciar o projeto:

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

---

## Acessos

- Banco de dados: mongodb://localhost:27017
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## Logs

Para visualizar os logs do projeto:

```bash
podman-compose logs
```

Para acompanhar os logs em tempo real:

```bash
podman-compose logs -f
```
