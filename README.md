# Zakah Calculator

A full-stack Zakah Calculator application with a Next.js frontend and Django backend.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
  - [Using Docker (Recommended)](#using-docker-recommended)
---

## Project Structure

```
.
├── backend/      # Django backend
├── frontend/     # Next.js frontend
├── docker-compose.yaml
├── docker-compose.prod.yaml
├── .env
└── README.md
```

---

## Development Setup

### Using Docker (Recommended)

#### 1. Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

#### 2. Environment Variables

- Copy `.env` and `prod.env` as needed and fill in required values.
- For development, `.env` is used by default.

#### 3. Start All Services

From the project root, run:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (Development)**: [http://localhost:8000](http://localhost:8000) (Server by Django dev server in development)
- **Backend (Production)**: [http://localhost:8001](http://localhost:8001) (Server by Gunicorn in production)

#### 4. Stopping Services

```bash
docker-compose down
```

#### 5. Running Backend Management Commands

For example, to run migrations:

```bash
docker-compose exec backend python manage.py migrate
```
