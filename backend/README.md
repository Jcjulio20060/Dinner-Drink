# ⚙️ Dinner-Drink — Backend API

API RESTful para o sistema **Dinner-Drink**, desenvolvida com **Node.js**, **Express 5** e **MongoDB** (via **Mongoose**).

---

## 📌 Visão Geral

O backend gerencia toda a regra de negócio do sistema:
- Cadastro e alteração de status de **Mesas** (`/tables`).
- Controle de catálogo e estoque de **Comidas/Bebidas** (`/food`).
- Criação, atualização e transições de estado de **Pedidos** (`/pedidos`).
- Validação automática de estoque no momento da criação de pedidos.

---

## 🚀 Requisitos e Instalação

### Pré-requisitos
- **Node.js** `18+`
- **MongoDB** em execução (localmente ou via Docker container)

### Passos de Instalação Local:

1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` copiando o modelo `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Defina as variáveis de ambiente necessárias no arquivo `.env`.

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
| :--- | :--- | :--- |
| `PORT` | Porta do servidor HTTP | `5000` |
| `MONGO_USER` | Usuário do MongoDB (opcional se auth desativada) | `admin` |
| `MONGO_PASSWORD` | Senha do MongoDB (opcional se auth desativada) | `secret` |
| `MONGO_HOST` | Host onde o MongoDB está rodando | `127.0.0.1` |
| `MONGO_PORT` | Porta do MongoDB | `27017` |
| `MONGO_DB` | Nome da base de dados | `dinnerdrink` |
| `MONGO_AUTH_SOURCE` | Database de autenticação do MongoDB | `admin` |
| `MONGO_USE_AUTH` | Habilitar autenticação MongoDB (`true`/`false`) | `true` |

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor em modo de produção (`node src/server.js`). |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com `nodemon` (Hot Reload). |

---

## 📂 Estrutura do Código

```text
backend/src/
├── app.js               # Configuração do Express e Middlewares (CORS, Express JSON)
├── server.js            # Inicialização da conexão com MongoDB e escuta na porta HTTP
├── router.js            # Roteador central da API (monta /tables, /food, /pedidos, /health)
├── config/
│   └── db.js            # Módulo de conexão Mongoose com suporte a credenciais
├── controllers/
│   ├── foodController.js     # Lógica CRUD para Comidas/Bebidas
│   ├── pedidoController.js   # Lógica CRUD e regra de estoque para Pedidos
│   └── tablesController.js   # Lógica CRUD para Mesas
├── models/
│   ├── foodModel.js     # Schema Mongoose (Name, Price, Category, Quantity)
│   ├── pedidoModel.js   # Schema Mongoose (TableId, Food Array, Status, Date)
│   └── tablesModel.js   # Schema Mongoose (Number, Capacity, Status, Pedidos Ref)
└── routes/
    ├── foodRoutes.js    # Definição das rotas /food
    ├── pedidoRoutes.js  # Definição das rotas /pedidos
    └── tablesRoutes.js  # Definição das rotas /tables
```

---

## 📡 Resumo de Endpoints da API

Para uma documentação completa dos payloads, parâmetros e exemplos em cURL, acesse a [Especificação da API REST (docs/API.md)](file:///home/julio/Documentos/Projects/Dinner-Drink/docs/API.md).

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna status do servidor (`ok`) |
| `GET` | `/health` | Healthcheck da API |
| `GET` | `/tables` | Lista todas as mesas |
| `POST` | `/tables` | Cria uma nova mesa |
| `PATCH` | `/tables/:id` | Atualiza o status de uma mesa |
| `DELETE` | `/tables/:id` | Remove uma mesa |
| `GET` | `/food` | Lista todos os itens do cardápio |
| `POST` | `/food` | Adiciona item de comida/bebida |
| `PATCH` | `/food/:id` | Atualiza preço/quantidade de um item |
| `DELETE` | `/food/:id` | Remove um item do cardápio |
| `GET` | `/pedidos` | Lista todos os pedidos |
| `POST` | `/pedidos` | Cria um pedido (valida e decrementa estoque) |
| `PATCH` | `/pedidos/:id` | Atualiza status (vincula à mesa ao concluir) |
| `DELETE` | `/pedidos/:id` | Remove um pedido |

---

## 🧠 Regras de Negócio Importantes

1. **Estoque Mínimo**: Ao criar um pedido via `POST /pedidos`, a API valida se cada item em `food` possui `quantity > 0`. Caso positivo, decrementa a quantidade em 1.
2. **Conclusão de Pedido**: Ao atualizar o status do pedido para `completed` via `PATCH /pedidos/:id`, a API registra automaticamente o pedido no histórico da mesa respectiva.

---

## 🔗 Links Relevantes

- 🏠 [README Raiz do Projeto](file:///home/julio/Documentos/Projects/Dinner-Drink/README.md)
- 🏛️ [Arquitetura Geral](file:///home/julio/Documentos/Projects/Dinner-Drink/docs/ARCHITECTURE.md)
- 📡 [Documentação Detalhada da API](file:///home/julio/Documentos/Projects/Dinner-Drink/docs/API.md)
