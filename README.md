PROJETO DE TESTE TÉCNICO

---

README do Projeto Monorepo Nx

Documentação para Execução e Desenvolvimento

Este documento fornece as instruções necessárias para configurar, executar e testar o projeto de teste técnico, que consiste em um monorepo Nx com aplicações backend e frontend.

Data: 2023-10-27 | Versão: 1.0

---

## 🚀 Visão Geral do Projeto

Este projeto é um monorepo gerenciado pelo Nx, contendo duas aplicações principais: um backend e um frontend. O objetivo é demonstrar uma arquitetura modular e a integração entre diferentes tecnologias em um ambiente de desenvolvimento padronizado.

### Backend
O backend é desenvolvido em Node.js e TypeScript, seguindo uma arquitetura modular com domínios como appointments, audit, auth, patients e procedures. A estrutura de camadas inclui application, domain, infra e presentation. Utiliza Prisma ORM para interagir com um banco de dados PostgreSQL e Mongoose ODM para interagir com MongoDB.

### Frontend
O frontend é uma aplicação Angular, estruturada com domínios como auth e dashboard dentro de `src/app`.

## 🛠️ Stack de Tecnologias

*   **Monorepo:** Nx
*   **Backend:**
    *   Linguagem: Node.js, TypeScript
    *   ORM/ODM: Prisma (PostgreSQL), Mongoose (MongoDB)
    *   Banco de Dados: PostgreSQL 16, MongoDB 7
    *   Container: node:20-alpine
*   **Frontend:**
    *   Framework: Angular
    *   Linguagem: TypeScript
    *   Container: node:20-alpine
*   **Orquestração:** Docker Compose v3.9

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter as seguintes ferramentas instaladas em sua máquina:

*   **Docker:** Versão 20.10.0 ou superior.
    *   [Instalação do Docker](https://docs.docker.com/get-docker/)
*   **Docker Compose:** Versão 2.0.0 ou superior (que utiliza o comando `docker compose` sem o hífen).
    *   Se você tiver uma versão mais antiga, o comando pode ser `docker-compose`.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e iniciar o projeto usando Docker Compose.

### 1. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de `.env.example` (se existir) ou criando-o manualmente. Este arquivo conterá as variáveis de ambiente necessárias para a conexão com os bancos de dados.

Exemplo de `.env` (variáveis obrigatórias):

dotenv
# Variáveis para o PostgreSQL
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=mydatabase

# Variáveis para o MongoDB (opcional, Mongoose pode usar uma URI completa)
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_DB=mydatabase

# URI de conexão do Prisma (para o backend)
DATABASE_URL="postgresql://docker:docker@postgres:5432/mydatabase?schema=public"

# URI de conexão do Mongoose (para o backend)
MONGO_URI="mongodb://root:root@mongo:27017/mydatabase?authSource=admin"

# Variáveis de ambiente para o backend (ex: JWT_SECRET)
JWT_SECRET=supersecretjwtkey

*   Certifique-se de que as variáveis `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB` estejam configuradas conforme o `docker-compose.yml`.
*   As variáveis `DATABASE_URL` e `MONGO_URI` são cruciais para o backend se conectar aos bancos de dados.

### 2. Iniciar os Serviços com Docker Compose

Navegue até a raiz do projeto no seu terminal e execute o seguinte comando:

```bash
docker compose up -d --build
```

*   `docker compose up`: Inicia os serviços definidos no `docker-compose.yml`.
*   `-d`: Executa os containers em modo *detached* (em segundo plano).
*   `--build`: Força a reconstrução das imagens dos serviços (backend e frontend), garantindo que as últimas alterações de código sejam incluídas.

Este comando irá:
1.  Construir as imagens Docker para o backend e frontend.
2.  Iniciar os serviços de PostgreSQL, MongoDB, backend e frontend.
3.  Dentro do container do backend, executar:
    *   `npm ci`: Instala as dependências do projeto.
    *   `npx nx run data-access:db-generate`: Gera o cliente Prisma.
    *   `npx nx run data-access:db-migrate`: Aplica as migrações do banco de dados.
    *   `npx nx run data-access:db-seed`: Popula o banco de dados com dados iniciais (se configurado).
    *   `npx nx serve backend`: Inicia o servidor backend.
4.  Dentro do container do frontend, executar:
    *   `npm ci`: Instala as dependências do projeto.
    *   `npx nx serve frontend`: Inicia a aplicação frontend.

### 3. Acompanhar os Logs

Para verificar o status dos serviços e acompanhar a inicialização, você pode usar:

```bash
docker compose logs -f
```

Pressione `Ctrl+C` para sair do modo de acompanhamento de logs sem parar os containers.

## 🌐 Endereços de Acesso

Após a inicialização bem-sucedida, você poderá acessar as aplicações nos seguintes endereços:

*   **Frontend:** http://localhost:4200
*   **Backend (API):** http://localhost:3333
*   **PostgreSQL:** Acessível internamente no Docker na porta 5432. Para acesso externo, verifique a configuração de portas no `docker-compose.yml`.
*   **MongoDB:** Acessível internamente no Docker na porta 27017. Para acesso externo, verifique a configuração de portas no `docker-compose.yml`.

## ⚙️ Comandos Úteis do Docker Compose

*   **Parar os serviços:**
    ```bash
    docker compose down
    ```
*   **Parar os serviços e remover volumes (limpar dados do banco):**
    ```bash
    docker compose down -v
    ```
    *Cuidado: Este comando removerá todos os dados persistidos nos volumes dos bancos de dados.*
*   **Reconstruir e reiniciar os serviços (útil após alterações no Dockerfile ou `docker-compose.yml`):**
    ```bash
    docker compose up -d --build
    ```
*   **Executar um comando dentro de um container (ex: acessar o bash do backend):**
    ```bash
    docker compose exec backend bash
    ```
    *Substitua `backend` pelo nome do serviço desejado (ex: `frontend`, `postgres`, `mongo`).*

## 🧪 Testes

Você pode executar os testes do projeto tanto dentro dos containers quanto localmente, se tiver as dependências instaladas.

### Executando Testes Dentro dos Containers

Para executar os testes de um serviço específico (ex: backend ou frontend) dentro do seu respectivo container:

```bash
# Para o backend
docker compose exec backend npx nx test backend

# Para o frontend
docker compose exec frontend npx nx test frontend
```

### Executando Testes Localmente (Requer Node.js e Nx CLI instalados)

Se você tiver o Node.js (v20 ou superior) e o Nx CLI instalados globalmente, e as dependências do projeto instaladas (`npm install` na raiz), você pode rodar os testes localmente:

```bash
# Instalar dependências (se ainda não o fez)
npm install

# Para o backend
npx nx test backend

# Para o frontend
npx nx test frontend
```

## 📁 Estrutura de Pastas

Abaixo está uma visão resumida da estrutura de pastas do monorepo, focando nas aplicações principais e na arquitetura modular do backend:

```
.
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── app/
│   │   │       ├── modules/
│   │   │       │   ├── appointments/  # Módulo de agendamentos
│   │   │       │   │   ├── application/
│   │   │       │   │   ├── domain/
│   │   │       │   │   ├── infra/
│   │   │       │   │   └── presentation/
│   │   │       │   ├── audit/         # Módulo de auditoria
│   │   │       │   ├── auth/          # Módulo de autenticação
│   │   │       │   ├── patients/      # Módulo de pacientes
│   │   │       │   └── procedures/    # Módulo de procedimentos
│   │   │       └── ... (outros arquivos da aplicação)
│   │   ├── Dockerfile
│   │   └── project.json
│   └── frontend/
│       ├── src/
│       │   ├── main.ts
│       │   ├── app/
│       │   │   ├── domain/
│       │   │   │   ├── auth/        # Módulo de autenticação
│       │   │   │   └── dashboard/   # Módulo de dashboard
│       │   │   └── ... (outros arquivos da aplicação)
│       │   └── ...
│       ├── Dockerfile
│       └── project.json
├── libs/            # Bibliotecas compartilhadas entre apps (se houver)
├── .env.example
├── docker-compose.yml
├── nx.json
├── package.json
└── tsconfig.base.json
```

## 📝 Observações Importantes

*   **Inicialização do Banco de Dados:** O `docker-compose.yml` está configurado para que, na inicialização do serviço `backend`, ele execute automaticamente os comandos `npx nx run data-access:db-generate`, `npx nx run data-access:db-migrate` e `npx nx run data-access:db-seed`. Isso garante que o esquema do banco de dados seja criado e populado com dados iniciais a cada *build* ou *restart* do container do backend.
*   **Persistência de Dados:** Os serviços de banco de dados (PostgreSQL e MongoDB) utilizam volumes Docker para persistir seus dados. Isso significa que, mesmo que você pare e inicie os containers, os dados do banco serão mantidos. Para remover completamente os dados e iniciar com um banco limpo, use o comando `docker compose down -v`.

## ⚠️ Troubleshooting

Se você encontrar problemas ao executar o projeto, verifique as seguintes soluções comuns:

*   **Portas Ocupadas:**
    *   Se você receber um erro como "port already in use", significa que as portas 3333 (backend) ou 4200 (frontend) já estão sendo usadas por outro processo em sua máquina.
    *   Solução: Identifique e encerre o processo que está usando a porta ou altere as portas no `docker-compose.yml` e no código da aplicação, se necessário.
        *   No Linux/macOS: `sudo lsof -i :`
        *   No Windows: `netstat -ano | findstr :` e depois `taskkill /PID  /F`
*   **Permissões de Arquivo:**
    *   Problemas de permissão podem ocorrer ao montar volumes ou ao Docker tentar criar arquivos.
    *   Solução: Verifique se o usuário que executa o Docker tem as permissões adequadas para os diretórios do projeto. Em alguns casos, pode ser necessário executar o Docker com `sudo` ou ajustar as permissões dos diretórios.
*   **Volumes de `node_modules`:**
    *   Se você estiver montando o diretório do projeto como um volume e tiver um `node_modules` local, isso pode causar conflitos com as dependências instaladas dentro do container.
    *   Solução: Certifique-se de que o `docker-compose.yml` está configurado para usar um volume nomeado ou um volume anônimo para `node_modules` dentro do container, ou adicione `node_modules` ao `.dockerignore` e `.gitignore`. O `npm ci` dentro do container deve garantir que as dependências corretas sejam instaladas para o ambiente do container.
*   **Reset do Banco de Dados:**
    *   Se precisar resetar completamente o estado dos bancos de dados (PostgreSQL e MongoDB), use o comando:
        ```bash
        docker compose down -v
        docker compose up -d --build
        ```
    *   Este comando irá remover os volumes de dados e recriar os bancos do zero, aplicando as migrações e o *seed* novamente.

Fim do Documento