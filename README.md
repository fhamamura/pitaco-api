# Pitaco API

Este é o backend da aplicação **Pitaco**, desenvolvido com Node.js, Express e MongoDB. A API fornece funcionalidades para gerenciar usuários, professores, aulas, feedbacks e autenticação. A documentação interativa da API é gerada com Swagger.

---

## Índice

-   [Funcionalidades](#funcionalidades)
-   [Instalação](#instalação)
-   [Configuração](#configuração)
-   [Endpoints da API](#endpoints-da-api)
-   [Documentação Swagger](#documentação-swagger)
-   [Estrutura de Pastas](#estrutura-de-pastas)
-   [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Funcionalidades

A API permite:

-   Gerenciar usuários (criar, listar).
-   Gerenciar professores e alunos.
-   Gerenciar aulas e feedbacks.
-   Autenticação e autorização com JWT.
-   Documentação interativa com Swagger.

---

## Instalação

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/fhamamura/pitaco-api.git
    ```

2. **Navegue até o diretório do projeto**:

    ```bash
    cd pitaco-api
    ```

3. **Instale as dependências**:

    ```bash
    npm install
    ```

4. **Inicie o servidor**:
    ```bash
    npm run serve
    ```

O servidor backend estará disponível em `http://localhost:5000`.

---

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
PORT=5000
MONGO_URI="mongodb://localhost:27017/mongo"
JWT_SECRET="seutokensecreto"
REDIS_URL="redis://suaurl"
OPENAI_API_KEY="suaapikey"
```

-   `PORT`: Define a porta em que o servidor será executado.
-   `MONGO_URI`: String de conexão ao MongoDB.
-   `JWT_SECRET`: String para criptografar o jsonwebtoken.
-   `REDIS_URL`: Url da redis cache, para agilizar as consultas em cache.
-   `OPENAI_API_KEY`: String key da OPENAI, para analisar sentimentos dos feedbacks.

---

## Endpoints da API

### Gerenciamento de Usuários

#### Listar todos os Usuários

-   GET `/users`

#### Criar um Usuário

-   POST `auth/registro`

    Body:

    ```json
    {
    	"nome": "Nome do usuário",
    	"email": "Email do usuário",
    	"senha": "Senha do usuário",
    	"tipo": "aluno ou professor"
    }
    ```

### Gerenciamento de Professores

#### Painel geral do professor com estatísticas de feedbacks

-   GET `/professores/dashboard`

#### Relatório detalhado de feedbacks de uma aula

-   GET `/professores/relatorio/:classId`

### Gerenciamento de Feedback

#### Obtém todos os feedbacks (Pitacos) de uma aula

-   GET `/pitaco/:classid`

#### Envia um feedback (Pitaco) para uma aula

-   POST `/alunos`

    Body:

    ```json
    {
    	"classId": "643f1b2c3d4e5f6a7b8c9d0e",
    	"nota": 4.5,
    	"comentario": "Ótima aula, muito bem explicada!"
    }
    ```

### Autenticação

#### Login

-   POST `auth/login`

    Body:

    ```json
    {
    	"email": "Email do usuário",
    	"senha": "Senha do usuário",
    	"secret": "Token secreto criado no .env"
    }
    ```

#### Logout

-   GET `/logout`

---

## Documentação Swagger

A documentação da API está disponível em Swagger.

Após iniciar o servidor, acesse a documentação em: `http://localhost:5000/api-docs`

Para adicionar a documentação com Swagger, foi utilizado o pacote `swagger-jsdoc` e `swagger-ui-express`.

---

## Estrutura de Pastas

```
├── src
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── server.js
│   └── testModels.js
├── .env
├── .gitignore
├── README.md
└── package.json
```

-   `src/config`: Contém a configuração da API.
-   `src/middleware`: Contém a autorização.
-   `src/models`: Define os modelos.
-   `src/routes`: Define as rotas da API.
-   `src/services`: Contém os serviços da API.

---

## Tecnologias Utilizadas

-   Node.js: Plataforma para execução do Javascript no servidor.
-   Express: Framework web para Node.js.
-   MongoDB: Banco de dados NoSQL usado para persistência.
-   Swagger: Documentação interativa da API.
-   Redis: Armazenamento em cache.
-   OpenAI: Inteligência Artificial (AI) na análise de feedbacks.
