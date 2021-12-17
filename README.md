# User management app

## Project Description
Project developed for demonstrative purposes, which consists of an application for managing user information.

## Technologies used

### Back-end
**Node.js:** open source server environment

**apollo-server-express:** the Express integration of Apollo Server. Apollo Server is a community-maintained open-source GraphQL server that works with many Node.js HTTP server frameworks.

**Prisma**: open source next-generation ORM

**Docker**: open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

**PostgreSQL**: powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. 

**graphql-tools:** set of npm packages and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript, following the GraphQL-first development workflow.

**graphql-middleware:** schema wrapper which allows you to manage additional functionality across multiple resolvers efficiently.

**graphql-shield:** it helps you create a permission layer for your application.

**Chai:** TDD assertion library for node and the browser that can be paired with any javascript testing framework

**Jest:** JavaScript Testing Framework with a focus on simplicity.

**graphql-request:** minimal GraphQL client supporting Node and browsers for scripts or simple apps

**jsonwebtoken:** an implementation of JSON Web Tokens.

**nodemon:** tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.


### API

**GraphQL:** is a query language for APIs and a runtime for fulfilling those queries with your existing data.


### General

**StandardJS:** JavaScript Style Guide, with linter & automatic code fixer


## Project Requirements
To run the project, you must have the following installed:

**Node.js**

```sudo apt install nodejs```

**npm**

```sudo apt install npm``` 

**Docker**

[Installation steps](https://docs.docker.com/engine/install/ubuntu/)

**docker-compose:**

[Installation steps](https://docs.docker.com/compose/install/)


## Project Setup

### Clone project
```git clone https://github.com/RobertoBetancourt/todo-app.git```

### Back-end

**In backend folder:**

```npm install```

```sudo docker-compose up -d```

```npx prisma migrate dev --name init```

```npm run dev```

## Project Testing

**While the back-end server is up, open another terminal (backend folder):**

```npm run test```
