# Documentação API DinnerDrink

Esta API fornece endpoints para gerenciar Mesas, Comidas/Bebidas e Pedidos usando Express + MongoDB.

## Visão geral

- Backend: `backend/src`
- Início do servidor: `node src/server.js`
- Framework: Express 5
- Banco de dados: MongoDB via Mongoose
- Rotas de API:
  - `/tables`
  - `/food`
  - `/pedidos`

## Requisitos

- Node.js 18+ recomendado
- MongoDB em execução localmente ou remoto
- Variáveis de ambiente configuradas no arquivo `.env`

## Instalação

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Variáveis de ambiente

Crie o arquivo `.env` utilizando como base o `.env.example` na pasta `backend` com as seguintes variáveis:

## Como executar

- Iniciar em modo normal:
  ```bash
  npm start
  ```
- Iniciar em modo de desenvolvimento com `nodemon`:
  ```bash
  npm run dev
  ```

## Estrutura de arquivos principais

- `src/server.js` — inicializa o servidor e conecta ao MongoDB
- `src/app.js` — configura middleware Express e CORS
- `src/router.js` — monta as rotas principais
- `src/controllers/` — lógica de CRUD para cada entidade
- `src/models/` — esquemas Mongoose
- `src/config/db.js` — conexão com MongoDB

## Rotas da API

### Endpoints públicos

- `GET /` — status do servidor
- `GET /health` — health check

### Mesas

- `GET /tables` — lista todas as mesas
- `GET /tables/:id` — busca mesa por ID
- `POST /tables` — cria uma mesa
- `PATCH /tables/:id` — atualiza o `status` da mesa
- `DELETE /tables/:id` — deleta uma mesa

#### Criar mesa

Body JSON:

```json
{
  "number": 1,
  "capacity": 4,
  "status": "available"
}
```

#### Atualizar mesa

Body JSON:

```json
{
  "status": "occupied"
}
```

### Comida/Bebida

- `GET /food` — lista todos os itens de comida/bebida
- `GET /food/:id` — busca item por ID
- `POST /food` — cria um item
- `PATCH /food/:id` — atualiza um item
- `DELETE /food/:id` — remove um item

#### Criar item de comida/bebida

Body JSON:

```json
{
  "name": "Coca-Cola",
  "price": 5.5,
  "category": "drink",
  "quantity": 20
}
```

#### Atualizar item de comida/bebida

Body JSON (qualquer campo opcional):

```json
{
  "price": 6.0,
  "quantity": 18
}
```

### Pedidos

- `GET /pedidos` — lista todos os pedidos
- `GET /pedidos/:id` — busca pedido por ID
- `POST /pedidos` — cria um pedido
- `PATCH /pedidos/:id` — atualiza um pedido
- `DELETE /pedidos/:id` — deleta um pedido

#### Criar pedido

Body JSON:

```json
{
  "tableId": "<tableId>",
  "food": ["<foodId1>", "<foodId2>"],
  "status": "pending"
}
```

> O campo `food` deve ser um array de IDs de itens do modelo `Food`. Também é aceito o campo alternativo `foodId` em vez de `food`.

#### Atualizar pedido

Body JSON:

```json
{
  "status": "completed"
}
```

## Modelos de dados

### Food

- `name` — string obrigatória
- `price` — número obrigatório
- `category` — enum: `drink` ou `food`
- `quantity` — número obrigatório

### Table

- `number` — número obrigatório
- `capacity` — número obrigatório
- `status` — enum: `available` ou `occupied`, padrão `available`
- `pedidos` — array de referências para pedidos

### Pedido

- `tableId` — referência(s) para a mesa
- `food` — array de referências para itens de comida/bebida
- `status` — enum: `pending`, `in_progress`, `completed`; padrão `pending`
- `createdAt` — data de criação automática

## Comportamento importante

- Ao criar um pedido, o backend valida se todos os itens de comida têm `quantity > 0`.
- Depois que o pedido é criado, a quantidade dos itens é decrementada em 1.
- Ao atualizar um pedido para `completed`, o backend adiciona o pedido à lista de `pedidos` da mesa.

## Observações

- O backend não possui testes automatizados definidos no `package.json`.
- Se você usar autenticação MongoDB, defina `MONGO_USE_AUTH=true` e forneça `MONGO_USER`, `MONGO_PASSWORD` e `MONGO_AUTH_SOURCE`.
- A configuração padrão espera um MongoDB acessível em `mongodb://127.0.0.1:27017/admin`.
