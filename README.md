# EmployeeHub

## Employee Management Platform

EmployeeHub is a web-based **Employee Management Platform** designed to provide a centralized system for managing company employees, organizational information, authentication, and business-related identity services.

The project is being developed with a **multi-tenant architecture**, with the long-term goal of supporting multiple companies from a single application while maintaining strict separation of each company's data.

---

## Project Status

🚧 **Active Development**

The project is currently in its initial development phase.

Implemented so far:

* Project structure
* React frontend
* Node.js / Express backend
* PostgreSQL database connection
* Environment variable configuration
* Backend API
* Frontend-to-backend communication
* Database connectivity test endpoint
* Git version control

Next development stages will include:

* Database migrations
* Multi-tenant database schema
* Company management
* Employee management
* Authentication and authorization
* Role-based access control
* Department management
* Audit logging
* Email provisioning architecture
* Microsoft 365 / Google Workspace integration
* Testing
* Dockerization
* Production deployment

---

## Architecture

The current application follows a client-server architecture:

```text
┌─────────────────────┐
│                     │
│   React Frontend    │
│                     │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│                     │
│ Node.js + Express   │
│      Backend        │
│                     │
└──────────┬──────────┘
           │
           │ SQL
           ▼
┌─────────────────────┐
│                     │
│     PostgreSQL      │
│      Database       │
│                     │
└─────────────────────┘
```

The architecture will later be extended with external identity and email providers.

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* `dotenv`
* `cors`

### Database

* PostgreSQL
* `pg` (node-postgres)

### Development Tools

* Git
* GitHub
* Visual Studio Code
* pgAdmin
* npm

### Planned Technologies

* node-pg-migrate
* JSON Web Tokens / session-based authentication
* Docker
* Microsoft Entra ID
* Microsoft 365 APIs
* Google Workspace APIs
* Automated testing

---

## Project Structure

```text
Employee Management Platform/
│
├── backend/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

> The `.env` file is used locally and is intentionally excluded from Git.

---

# Getting Started

## Prerequisites

Before running EmployeeHub locally, make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* pgAdmin
* Git

You can verify Node.js and npm installation with:

```bash
node --version
npm --version
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project directory:

```bash
cd "Employee Management Platform"
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

The backend currently uses:

* Express
* CORS
* dotenv
* PostgreSQL driver (`pg`)
* Nodemon for development

---

## Database Configuration

EmployeeHub currently uses PostgreSQL.

Create a PostgreSQL database named:

```text
employeehub
```

The local PostgreSQL configuration is stored in:

```text
backend/.env
```

Example configuration:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=employeehub
DB_PASSWORD=your_password
DB_PORT=5433
```

> The port shown above reflects the current local development environment. PostgreSQL installations may use a different port, such as `5432`.

**Never commit the `.env` file to Git.**

---

# Running the Backend

From the `backend` directory:

```bash
npm run dev
```

The development server should start at:

```text
http://localhost:5000
```

The root endpoint can be accessed at:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "message": "EmployeeHub API is running!"
}
```

---

# Testing the Database Connection

EmployeeHub currently includes a simple database connectivity endpoint:

```text
http://localhost:5000/api/test-db
```

If the database connection is successful, the API returns information similar to:

```json
{
  "message": "Database connection successful!",
  "time": "..."
}
```

This endpoint is currently used as a development and infrastructure test.

It is not intended to be the final production database health-check implementation.

---

# Frontend Setup

Open a second terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

The React application currently communicates with the backend API to verify frontend-backend connectivity.

---

# Environment Variables

Environment-specific configuration is stored in `.env` files.

The repository intentionally ignores:

```text
.env
.env.*
```

This prevents sensitive information such as:

* database passwords
* API keys
* access tokens
* provider credentials
* authentication secrets

from being committed to the repository.

---

# Database Architecture

The long-term database architecture is designed around a **multi-tenant model**.

The initial conceptual structure includes entities such as:

```text
companies
    │
    ├── departments
    │
    └── employees
            │
            └── users
```

Additional infrastructure tables will include:

```text
audit_logs
```

Each company will have its own isolated data through a tenant/company identifier.

This allows the same application to support multiple organizations without requiring a separate application instance for every customer.

---

# Planned Email Provisioning Architecture

EmployeeHub is intended to eventually support automatic corporate email provisioning.

The application will use an abstraction layer between the business logic and external email providers.

Conceptually:

```text
EmployeeHub
     │
     ▼
Email Provider Interface
     │
     ├── Mock Provider
     │
     ├── Microsoft 365
     │
     └── Google Workspace
```

This approach allows the core employee-management system to remain independent of a specific email provider.

The customer's own domain and email provider will be configurable rather than hardcoded into the application.

---

# Multi-Tenancy

EmployeeHub is being designed as a **multi-tenant application**.

A tenant represents a company using the platform.

For example:

```text
Company A
    ├── Employees
    ├── Departments
    └── Users

Company B
    ├── Employees
    ├── Departments
    └── Users
```

The backend will enforce tenant isolation so that users belonging to one company cannot access another company's data.

This is a fundamental security requirement of the platform.

---

# Security Principles

Security is considered part of the architecture from the beginning.

The project will follow principles such as:

* Never store secrets in source control
* Environment-based configuration
* Password hashing
* Authentication and authorization
* Role-based access control
* Tenant isolation
* Input validation
* Secure API design
* Audit logging
* Principle of least privilege
* Secure handling of external provider credentials

Security requirements will become more detailed as authentication and multi-tenant functionality are implemented.

---

# Development Workflow

The project uses Git for version control.

The general workflow is:

```text
Develop
   ↓
Test
   ↓
Git status
   ↓
Git add
   ↓
Git commit
   ↓
Git push
```

Changes should be committed in logical stages with descriptive commit messages.

---

# Development Roadmap

### Phase 1 — Project Foundation

* [x] Initialize Git repository
* [x] Create backend
* [x] Create frontend
* [x] Configure Express
* [x] Configure React/Vite
* [x] Configure PostgreSQL
* [x] Establish backend-database connection
* [x] Establish frontend-backend communication

### Phase 2 — Database

* [ ] Configure database migrations
* [ ] Create `companies`
* [ ] Create `departments`
* [ ] Create `employees`
* [ ] Create `users`
* [ ] Create `audit_logs`
* [ ] Implement database constraints and indexes

### Phase 3 — Authentication

* [ ] User authentication
* [ ] Password hashing
* [ ] Session/JWT strategy
* [ ] Role-based authorization
* [ ] Company-level access control

### Phase 4 — Employee Management

* [ ] Create employees
* [ ] Update employees
* [ ] Delete/deactivate employees
* [ ] Employee search
* [ ] Employee profiles
* [ ] Department assignment

### Phase 5 — Identity & Email

* [ ] Email provider abstraction
* [ ] Mock email provider
* [ ] Microsoft 365 integration
* [ ] Google Workspace integration
* [ ] Domain configuration
* [ ] Employee email provisioning

### Phase 6 — Production Readiness

* [ ] Automated tests
* [ ] API validation
* [ ] Security hardening
* [ ] Docker
* [ ] Production environment configuration
* [ ] Logging and monitoring
* [ ] Deployment
* [ ] Documentation

---

# License

This project is currently under private development.

License and distribution terms will be defined before public or commercial release.
