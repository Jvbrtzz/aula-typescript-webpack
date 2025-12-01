import express, { Express, Request, Response } from "express";

// Exemplo simples: usar um "banco" em memória (você substituirá com SQLite/MongoDB/etc.)
interface User {
  id: number;
  name: string;
  email: string;
}

const app: Express = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// "Banco de dados" simples em memória
let users: User[] = [
  { id: 1, name: "João", email: "joao@email.com" },
  { id: 2, name: "Maria", email: "maria@email.com" },
];

// GET - Retorna todos os usuários
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// GET - Retorna um usuário por ID
app.get("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  res.json(user);
});

// POST - Cria um novo usuário
app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: "Nome e email são obrigatórios" });
    return;
  }

  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Atualiza um usuário
app.put("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE - Remove um usuário
app.delete("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
