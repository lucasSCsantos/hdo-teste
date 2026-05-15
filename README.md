# CALENDAR ESTÁ IMPLEMENTADO NA FEATURE feature/calendar


# 🧪 Teste Técnico — Nx Monorepo

![Nx](https://img.shields.io/badge/Nx-Monorepo-blue)
![Node](https://img.shields.io/badge/Node.js-20-green)
![Angular](https://img.shields.io/badge/Angular-Frontend-red)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green)

> Projeto de teste técnico para **Hospital da Obesidade** utilizando **Nx Monorepo**, contendo backend e frontend totalmente dockerizados para execução simples.

---

## 📌 Visão Geral

Este projeto é um **monorepo Nx** com:

- 🖥️ **Backend:** Node.js + TypeScript (Clean Architecture)  
- 🌐 **Frontend:** Angular  
- 🗄️ **Banco de Dados:** PostgreSQL + MongoDB  
- 🐳 **Infraestrutura:** Docker + Docker Compose  

> ⚡ O objetivo é permitir que o recrutador execute o projeto com apenas um comando.

---

## 🧱 Estrutura

```text
apps/
 ├── backend
 └── frontend
libs/
docker-compose.yml
.env.example
```

---

## 🛠️ Stack

### Backend
- Node.js + TypeScript  
- Prisma (PostgreSQL)  
- Mongoose (MongoDB)  
- Arquitetura modular por domínio

### Frontend
- Angular v20 
- Organização por domínio (auth, dashboard)

### Infra
- Docker  
- Docker Compose  
- PostgreSQL 16  
- MongoDB 7  

---

## 📋 Pré-requisitos

Apenas:

- Docker >= 20  
- Docker Compose >= 2  

👉 https://docs.docker.com/get-docker/

---

# 🚀 Rodando o projeto


## 📥 Clonar o Repositório

```bash
git clone git@github.com:lucasSCsantos/hdo-teste.git

cd hdo-teste
```

## ⚙️ Variáveis de Ambiente

Copie o arquivo:

```bash
cp .env.example .env
```

Conteúdo do `.env.example`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=hdo-teste

BACKEND_PORT=3333
FRONTEND_PORT=4200

MONGO_DB=hdo-teste

POSTGRES_URL=postgres://postgres:postgres@localhost:5432/hdo-teste
MONGO_URL=mongodb://localhost:27017/hdo-teste

JWT_SECRET=secret123
```

Copie para `.env`


## 🚀 Como Executar

Na raiz do projeto:

```bash
docker compose up
```

Docker irá automaticamente:

- Subir PostgreSQL e MongoDB  
- Instalar dependências  
- Rodar migrations  
- Iniciar backend  
- Iniciar frontend  

Nenhum outro comando é necessário.

---

## 🌐 Acesso

- Frontend:  
  👉 http://localhost:4200  

- Backend:  
  👉 http://localhost:3333  

---

## 🧪 Testes (Opcional)

O backend foi desenvolvido com TDD.

```bash
docker compose exec backend npx nx test backend
```

## 👤 Usuário para Teste

Já existe um usuário pré-cadastrado para facilitar os testes da aplicação:

**Usuário ADMIN:**

- 📧 Email: `admin@hospital.local`  
- 🔑 Senha: `Senha@123`

> Utilize este usuário para acessar o sistema e validar as funcionalidades administrativas sem necessidade de criar um novo cadastro.

---

## 🗂 Arquitetura do Backend

Cada módulo segue um modelo Clean Architecture reduzido:

```text
appointments/
 ├── application
 ├── domain
 ├── infra
 └── presentation
```

Domínios:
- appointments  
- audit  
- auth  
- patients  
- procedures  

---

## 💾 Banco de Dados

- PostgreSQL: dados relacionais  
- MongoDB: logs de auditoria  
- Dados persistem via volumes Docker  

Para resetar:

```bash
docker compose down -v
docker compose up
```

---

## ⚠️ Problemas Comuns

### Porta ocupada
Edite no `.env`:

```env
BACKEND_PORT=3334
FRONTEND_PORT=4300
```

ou no terminal

```bash
lsof -i :4200
lsof -i :3333
```

⚠️ Se alterar no `.env` é necessário alterar a rota da api em `frontend/src/environment/environment.ts` também.

### Rebuild
```bash
docker compose up --build
```

---

## ✅ Execução Rápida

```bash
cp .env.example .env
docker compose up
```

Abra:
- http://localhost:4200  
- http://localhost:3333  

---

## 📮 Como Usar o Postman

Este projeto já inclui uma coleção do Postman pronta para testar toda a API.

A coleção está localizada em:

```text
postman/
 ├── HDO.postman_collection.json
 └── HDOEnvironment.postman_environment.json
 ```

---

## 📄 Observações

Este projeto demonstra:

✔ Nx Monorepo  
✔ Clean Architecture  
✔ Backend + Frontend  
✔ PostgreSQL + MongoDB  
✔ Ambiente Dockerizado  

---

👨‍💻 Desenvolvido como teste técnico.
