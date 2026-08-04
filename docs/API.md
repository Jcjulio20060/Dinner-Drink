# 📡 Especificação da API REST Dinner-Drink

Documentação completa e referência técnica de todos os endpoints expostos pela API do **Dinner-Drink**.

---

## 📌 Informações Gerais

- **Base URL (Local)**: `http://localhost:5000`
- **Base URL (Docker)**: `http://localhost:5000`
- **Formato das Requisições**: `JSON` (`Content-Type: application/json`)
- **Formato das Respostas**: `JSON`

---

## 🟢 Endpoints de Verificação (Public/Health)

### `GET /`
Verifica se o servidor backend está online.
- **Resposta**: `200 OK`
  ```text
  ok
  ```

### `GET /health`
Verifica o status de saúde da aplicação.
- **Resposta**: `200 OK`
  ```text
  ok
  ```

---

## 🪑 Mesas (`/tables`)

### 1. Listar todas as mesas
`GET /tables`

- **Resposta**: `200 OK`
  ```json
  [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "number": 1,
      "capacity": 4,
      "status": "available",
      "pedidos": []
    }
  ]
  ```

### 2. Buscar mesa por ID
`GET /tables/:id`

- **Resposta**: `200 OK`

### 3. Criar uma nova mesa
`POST /tables`

- **Body**:
  ```json
  {
    "number": 1,
    "capacity": 4,
    "status": "available"
  }
  ```
- **Campos**:
  - `number` (Number, Obrigatório): Número de identificação da mesa.
  - `capacity` (Number, Obrigatório): Capacidade total de pessoas.
  - `status` (String, Opcional): Estado inicial (`available` ou `occupied`). Padrão: `available`.

### 4. Atualizar mesa
`PATCH /tables/:id`

- **Body**:
  ```json
  {
    "status": "occupied"
  }
  ```

### 5. Excluir mesa
`DELETE /tables/:id`

- **Resposta**: `200 OK` / `204 No Content`

---

## 🍕 Comidas e Bebidas (`/food`)

### 1. Listar itens do cardápio
`GET /food`

- **Resposta**: `200 OK`
  ```json
  [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Coca-Cola 350ml",
      "price": 6.5,
      "category": "drink",
      "quantity": 50
    }
  ]
  ```

### 2. Buscar item por ID
`GET /food/:id`

### 3. Cadastrar novo item de comida/bebida
`POST /food`

- **Body**:
  ```json
  {
    "name": "Hambúrguer Artesanal",
    "price": 32.90,
    "category": "food",
    "quantity": 15
  }
  ```
- **Campos**:
  - `name` (String, Obrigatório): Nome do item.
  - `price` (Number, Obrigatório): Preço unitário.
  - `category` (String, Obrigatório): Categoria (`food` ou `drink`).
  - `quantity` (Number, Obrigatório): Quantidade em estoque.

### 4. Atualizar item
`PATCH /food/:id`

- **Body**:
  ```json
  {
    "price": 34.90,
    "quantity": 20
  }
  ```

### 5. Excluir item
`DELETE /food/:id`

---

## 📝 Pedidos (`/pedidos`)

### 1. Listar todos os pedidos
`GET /pedidos`

- **Resposta**: `200 OK`

### 2. Buscar pedido por ID
`GET /pedidos/:id`

### 3. Criar um novo pedido
`POST /pedidos`

- **Body**:
  ```json
  {
    "tableId": "64f1a2b3c4d5e6f7a8b9c0d1",
    "food": [
      "64f1a2b3c4d5e6f7a8b9c0d2"
    ],
    "status": "pending"
  }
  ```
- **Comportamento Interno**:
  - Valida se os itens em `food` possuem `quantity > 0`.
  - Decrementa em 1 a quantidade de cada item selecionado na coleção `Food`.

### 4. Atualizar pedido
`PATCH /pedidos/:id`

- **Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Comportamento Interno**:
  - Ao alterar o status para `completed`, o pedido é adicionado automaticamente à lista de `pedidos` da mesa correspondente (`tableId`).

### 5. Excluir pedido
`DELETE /pedidos/:id`
