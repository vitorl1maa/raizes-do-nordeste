import type { Skill } from '../types/skill';

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend',
    description: 'Biblioteca JavaScript para construir interfaces.',
    content: `# React

## O que é?

React é uma biblioteca JavaScript declarativa, eficiente e flexível para criar interfaces com o usuário baseadas em componentes.

## Instalação

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Exemplo básico

\`\`\`jsx
function App() {
  return <h1>Hello, world!</h1>;
}
\`\`\`

## Hooks principais

- **useState** — estado local
- **useEffect** — side effects
- **useContext** — context API
- **useReducer** — estado complexo`,
    tags: ['ui', 'library'],
    author: 'John Doe',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-06-24T00:00:00Z',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Node.js',
    category: 'Backend',
    description: 'Runtime JavaScript para o lado do servidor.',
    content: `# Node.js

## O que é?

Node.js é um runtime JavaScript construído sobre o motor V8 do Chrome, projetado para construir aplicações de rede escaláveis.

## Instalação

\`\`\`bash
# via nvm
nvm install --lts
nvm use --lts
\`\`\`

## Express.js

\`\`\`js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
\`\`\``,
    tags: ['runtime', 'server'],
    author: 'John Doe',
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-06-22T00:00:00Z',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Docker',
    category: 'DevOps',
    description: 'Plataforma de containerização de aplicações.',
    content: `# Docker

## O que é?

Docker é uma plataforma para desenvolvimento, deploy e execução de aplicações em containers.

## Dockerfile

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Comandos essenciais

- \`docker build -t app .\`
- \`docker run -p 3000:3000 app\`
- \`docker compose up -d\``,
    tags: ['containers', 'devops'],
    author: 'Jane Smith',
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-06-20T00:00:00Z',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Banco de dados relacional open-source avançado.',
    content: `# PostgreSQL

## O que é?

PostgreSQL é um sistema de gerenciamento de banco de dados relacional-objeto de código aberto.

## Conexão

\`\`\`sql
psql -U postgres -d mydb
\`\`\`

## Criar tabela

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\``,
    tags: ['sql', 'database'],
    author: 'Jane Smith',
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-06-18T00:00:00Z',
    isFavorite: true,
  },
  {
    id: '5',
    name: 'AWS S3',
    category: 'DevOps',
    description: 'Serviço de armazenamento de objetos na nuvem.',
    content: `# AWS S3

## O que é?

Amazon S3 (Simple Storage Service) é um serviço de armazenamento de objetos escalável.

## Upload via SDK

\`\`\`js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({ region: 'us-east-1' });

await client.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'file.txt',
  Body: 'Hello S3!',
}));
\`\`\``,
    tags: ['cloud', 'storage'],
    author: 'John Doe',
    createdAt: '2026-03-05T00:00:00Z',
    updatedAt: '2026-06-15T00:00:00Z',
    isFavorite: false,
  },
  {
    id: '6',
    name: 'OpenAI API',
    category: 'AI/ML',
    description: 'API para integração com modelos de linguagem.',
    content: `# OpenAI API

## O que é?

A API da OpenAI permite integrar modelos avançados de linguagem natural em suas aplicações.

## Chamada básica

\`\`\`js
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'Você é um assistente útil.' },
    { role: 'user', content: 'Olá!' }
  ],
});

console.log(response.choices[0].message.content);
\`\`\``,
    tags: ['ai', 'api'],
    author: 'Jane Smith',
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-06-10T00:00:00Z',
    isFavorite: false,
  },
];
