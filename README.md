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


#### Prerequisites
- [Node.JS](https://nodejs.org/en)
- [Python](https://www.python.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Using Docker (Recommended)
#### 1. Environment Variables

- Copy `.env` and `prod.env` as needed and fill in required values.
- For development, `.env` is used by default.

#### 3. Start All Services

From the project root, run:

```bash
docker-compose up --build # will build and start container
docker-compose up # will save some time and only start the container
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (Development)**: [http://localhost:8000](http://localhost:8000) (Server by Django dev server in development)

#### 4. Stopping Services

```bash
docker-compose down
```

#### 5. Running Backend Management Commands

To access the container or debugging

```bash
docker-compose exec -it <container_id> sh
```

## Submission
### Fix lint error
```
npm run lint -- --fix
```
