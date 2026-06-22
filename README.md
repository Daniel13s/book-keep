# 📚 Livros API — Catálogo & Gerenciamento de Alta Performance

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

API REST robusta e escalável desenvolvida para o gerenciamento de catálogo de livros e coleções pessoais (`MyBooks`). O grande diferencial do projeto está na sua **arquitetura orientada à performance**, projetada para suportar alta concorrência por meio de cache em memória, paginação inteligente, buscas otimizadas e ambiente totalmente conteinerizado.

---

## Desafios de Engenharia & Evolução de Arquitetura

O projeto foi submetido a rigorosos **testes de carga e estresse utilizando o Grafana K6** (simulando 100 usuários simultâneos em regime de looping por 50 segundos). A análise dos gargalos de infraestrutura direcionou a evolução da API em três fases essenciais:

### Fase 1: O Gargalo do SQLite (Escrita Concorrente)
Inicialmente, a API utilizava o SQLite. Sob estresse, o mecanismo de *write-lock* (travamento do arquivo físico para escrita) gerou uma fila massiva de requisições pendentes na rota POST `/book`.
* **Resultado:** O tempo de resposta disparou para a casa dos **segundos**, o servidor Node/Express estourou o limite de conexões abertas no SO e a taxa de erro atingiu **16.70%** por quedas forçadas (`wsarecv: An existing connection was forcibly closed`).

### Fase 2: Migração para PostgreSQL (Docker)
Substituímos o banco de desenvolvimento por um cluster isolado do **PostgreSQL** via Docker Compose. O Postgres gerencia processos concorrentes com maestria.
* **Resultado:** A taxa de erro despencou para **0.00% absoluto** e o throughput da API aumentou significativamente.

### Fase 3: Otimização Extrema com Cache Interceptador (Redis)
Para blindar as rotas de listagem (`GET`), implementamos um **Middleware de Cache dinâmico no Redis**. Ele intercepta a resposta do Express e salva o payload em memória (RAM) utilizando um TTL (Time-To-Live) estratégico. Se a mesma URL (incluindo filtros e paginação) for requisitada, o Redis entrega o dado em milissegundos sem sequer acionar o PostgreSQL.

### Comparativo Real de Performance (Métricas do K6)

| Métrica | Cenário A: SQLite (Sem Cache) | Cenário B: PostgreSQL + Redis (Cache Hit) | Evolução |
| :--- | :---: | :---: | :---: |
| **Requisições Processadas** | 497 | **3.007** | **+ 505% mais requisições** |
| **Taxa de Erro (Falhas)** | 16.70% | **0.00%** | **Estabilidade Total (0 falhas)** |
| **Tempo de Resposta Médio** | 6.04s | **11.12ms** | **~ 540x mais rápido** |
| **Tempo Máximo P(95)** | 12.71s | **19.25ms** | **Latência ultra-baixa** |

---

## Tecnologias & Recursos Utilizados

* **Runtime & Linguagem:** Node.js com TypeScript (Tipagem estática e segurança em tempo de desenvolvimento).
* **Framework Web:** Express.js estruturado com controle fino de Middlewares.
* **ORM & Banco de Dados:** Prisma ORM integrado ao PostgreSQL 15.
* **Camada de Cache:** Redis 7 para armazenamento chave-valor de altíssima velocidade.
* **Autenticação:** Middleware de validação de tokens JWT (Segurança em primeiro nível, operando antes da camada de cache).
* **Paginação e Busca Dinâmica:** Parâmetros `page`, `limit` e `search` via `req.query` nativos no Prisma para evitar sobrecarga de memória e permitir paginação leve no banco.
* **Infraestrutura:** Docker e Docker Compose isolando os serviços de API, Banco de Dados e Cache na mesma rede interna.

---

## Estrutura das Rotas & Funcionalidades

### Autenticação & Usuários
* `POST /register` - Cria uma nova conta de usuário no sistema.
* `POST /login` - Autentica o usuário e gera o token de acesso JWT necessário para as rotas protegidas.

### Catálogo Global (`Books`)
* `POST /book` - Cadastro de novos livros no catálogo global. *(Protegido por autenticação)*.
* `GET /book` - Listagem de todos os livros cadastrados com suporte a **Paginação** e **Busca textual (Search)**. *(Rota Otimizada com Redis Cache)*.

### Coleção Pessoal (`MyBooks`)
* `POST /myBook` - Vincula um livro do catálogo global à coleção do usuário autenticado. *(Protegido por autenticação)*.
* `GET /myBook` - Lista os livros da coleção particular do usuário logado, com suporte a **Paginação** e **Busca textual (Search)**. *(Rota Protegida e Otimizada com Redis Cache)*.

> **Detalhe de Implementação:** A chave do Redis é gerada dinamicamente com base na URL completa da requisição (`cache:${req.originalUrl}`). Isso garante que pesquisas por `?search=clean+code&page=1` tenham caches completamente independentes de `?search=typescript`, evitando vazamento ou mistura de dados.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* Ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados na máquina.

### Passos para Inicialização

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/Daniel13s/book-keep.git](https://github.com/Daniel13s/book-keep.git)
   cd nome-do-repositorio