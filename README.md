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
* [ ] Establish frontend-backend communication

### Phase 2 — Database

* [x] Configure database migrations
* [x] Create `companies`
* [x] Create `departments`
* [x] Create `employees`
* [x] Create `users`
* [x] Create `audit_logs`
* [x] Implement database constraints and indexes

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

### Employee Management — Progress

**Completed**

* [x] Implemented `GET /api/companies/:companyId/employees` to retrieve employees belonging to a company.
* [x] Implemented `POST /api/companies/:companyId/employees` to create employees.
* [x] Implemented `PUT /api/companies/:companyId/employees/:employeeId` to update employee details.
* [x] Added input validation for employee names, email addresses, department IDs, hire dates, and employment status.
* [x] Enforced company ownership checks when retrieving, creating, and updating employees.
* [x] Added department information to employee list responses using a `LEFT JOIN`.
* [x] Standardized hire date responses to `YYYY-MM-DD`.
* [x] Tested employee creation, retrieval, validation, and update requests through Postman.

**Next steps**

* [ ] Implement employee status changes through a dedicated `PATCH` endpoint.
* [ ] Review employee deletion and termination handling to preserve HR history.
* [ ] Add authentication and role-based authorization.
* [ ] Continue backend implementation before proceeding with the planned frontend development.


### Phase 5 — Frontend & User Experience

* [ ] Design system and UI components
* [ ] Application layout and navigation
* [ ] Dashboard interface
* [ ] Responsive design
* [ ] Loading, empty and error states
* [ ] Frontend form validation
* [ ] API integration for employee management
* [ ] Role-based UI visibility

### Phase 6 — Identity & Email

* [ ] Email provider abstraction
* [ ] Mock email provider
* [ ] Microsoft 365 integration
* [ ] Google Workspace integration
* [ ] Domain configuration
* [ ] Employee email provisioning

### Phase 7 — Production Readiness

* [ ] Automated tests
* [ ] API validation
* [ ] Security hardening
* [ ] Docker
* [ ] Production environment configuration
* [ ] Logging and monitoring
* [ ] Deployment
* [ ] Documentation


## Design Decision DD-001: Separation of Employees and Users

**Status:** Accepted — subject to future review

**Decision:** The EmployeeHub platform will maintain separate database entities for `employees` and `users`.

**Rationale:**

* The `employees` entity will represent personnel and employment information, including employee identity, company affiliation, department, professional contact details and employment dates.
* The `users` entity will represent application accounts and authentication information, including login identifiers, securely stored password hashes and access roles.
* An employee may exist in the system without having an application account.
* Separating personnel records from authentication accounts provides greater flexibility when managing onboarding, account activation, access permissions and employee departures.

**Architectural implications:**

* Both entities will be associated with the relevant company to support the platform's multi-tenant architecture.
* The relationship between an employee and a user account will be explicitly defined when implementing authentication.
* Authorization and tenant isolation must be enforced by the backend, independently of this data model separation.

**Future review:** This decision is open to reconsideration as the platform evolves. It may be reviewed if implementation complexity, business requirements or changes to the identity and access management model justify an alternative design.

**Review trigger:** Reassess the decision when implementing authentication, account provisioning and employee lifecycle management.

**Decision date:** October 2026.

## Current Implementation Status

### 1. Technology Stack

The EmployeeHub platform currently uses the following technologies:

* **Frontend:** React and Vite
* **Backend:** Node.js and Express.js
* **Database:** PostgreSQL
* **Database access:** `pg` (node-postgres)
* **Database migrations:** `node-pg-migrate`
* **Development server:** Nodemon
* **Version control:** Git and GitHub

### 2. Database Architecture

The initial database schema has been implemented using version-controlled migrations.

The following tables have been created:

| Table          | Purpose                                                               |
| -------------- | --------------------------------------------------------------------- |
| `companies`    | Stores customer company information and configuration.                |
| `departments`  | Stores departments belonging to each company.                         |
| `employees`    | Stores employee and personnel information.                            |
| `users`        | Stores authentication-related information, password hashes and roles. |
| `audit_logs`   | Stores records of relevant system actions for auditing.               |
| `pgmigrations` | Tracks applied database migrations.                                   |

#### Companies

The `companies` table includes:

* UUID primary key generated by PostgreSQL.
* Company name and optional unique domain.
* Email provider configuration (`mock`, `microsoft` or `google`).
* Company status (`active` or `suspended`).
* Creation and update timestamps.

#### Departments

The `departments` table includes:

* UUID primary key.
* A mandatory `company_id` foreign key.
* Department name and optional description.
* Creation and update timestamps.
* A unique constraint on `(company_id, name)`.
* A composite unique constraint on `(company_id, id)` to support tenant-aware foreign key relationships.

This design allows different companies to have departments with identical names while preventing duplicate department names within the same company.

#### Employees and Users

Employee personnel records are separated from authentication accounts.

* `employees` stores HR-related information, such as names, work email, job title, hire date, employment status and department.
* `users` stores login credentials, password hashes, account status and authorization roles.

Composite foreign keys enforce company consistency between employees and their departments, and between users and their associated employee records.

The planned authorization roles are `SUPER_ADMIN`, `COMPANY_ADMIN` and `EMPLOYEE`.

The global `SUPER_ADMIN` account model requires further architectural review because the current users schema requires a `company_id`.

#### Audit Logs

The `audit_logs` table provides a foundation for recording system actions, associated users, affected entities, additional JSON metadata, IP addresses and timestamps.

### 3. Backend API

The backend follows a modular structure that separates route definitions from controller logic.

```text
backend/
├── controllers/
│   ├── companyController.js
│   └── departmentController.js
├── routes/
│   ├── companyRoutes.js
│   └── departmentRoutes.js
├── config/
│   └── database.js
├── migrations/
├── server.js
└── database.config.cjs
```

#### Companies API

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/companies` | Retrieves companies. |
| POST   | `/api/companies` | Creates a company.   |

The company creation endpoint implements input validation, parameterized SQL queries, database-generated UUIDs and appropriate HTTP responses.

Supported email providers are `mock`, `microsoft` and `google`. The provider defaults to `mock` when omitted.

#### Departments API

| Method | Endpoint                                | Description                                            |
| ------ | --------------------------------------- | ------------------------------------------------------ |
| GET    | `/api/companies/:companyId/departments` | Retrieves departments belonging to a specific company. |
| POST   | `/api/companies/:companyId/departments` | Creates a department for a specific company.           |

The company UUID is obtained from the URL rather than the request body.

The endpoints implement:

* Company UUID format validation.
* Company existence checks.
* Department name and description validation.
* Parameterized SQL queries.
* HTTP `201 Created` for successful department creation.
* HTTP `400 Bad Request` for invalid input.
* HTTP `404 Not Found` when the company does not exist.
* HTTP `409 Conflict` for duplicate department names within the same company.
* HTTP `500 Internal Server Error` for unexpected failures.

The department router uses `mergeParams: true` to access the `companyId` parameter inherited from its parent route.

Database constraints provide an additional layer of integrity beyond application-level validation.

### 4. Database Migrations

The database schema is managed through `node-pg-migrate`.

Migrations have been applied for:

1. Company creation.
2. Department creation.
3. Department composite uniqueness.
4. Employee creation.
5. Employee composite uniqueness.
6. User creation.
7. Audit log creation.

Applied migrations should be treated as historical records. Schema changes should generally be introduced through new migrations rather than modifying migrations that have already been applied.

### 5. Testing and Verification

The following functionality has been tested successfully during local development:

* PostgreSQL connectivity.
* Retrieval of companies.
* Creation of a company.
* Validation of required company fields.
* Rejection of unsupported email providers.
* Handling of duplicate company domains.
* Retrieval of departments for a specific company.
* Creation of a department.
* Validation of department input.
* Handling of duplicate department names.
* Verification that department records reference the correct company.

The first department created during development was `IT`, with the description `Information Technology Department`.

### 6. Security and Outstanding Work

The current API is a development implementation and is not yet production-ready.

The following work remains necessary:

* Authentication and authorization.
* Enforced tenant isolation based on the authenticated user's company membership.
* Protection of company creation and other administrative endpoints.
* Review of the global `SUPER_ADMIN` account design.
* Password hashing and secure account provisioning.
* Automated backend tests.
* Request validation and centralized error handling.
* Removal of temporary debugging output before committing production-ready code.

Filtering data by `companyId` is not, by itself, sufficient authorization. In production, the server must verify that the authenticated user is permitted to access the requested company.

### 7. Next Development Milestones

The planned development sequence is:

1. Implement the Employees API.
2. Add employee validation and company/department consistency checks.
3. Add authentication and authorization.
4. Implement user account provisioning.
5. Implement audit logging for relevant operations.
6. Add automated tests.
7. Connect the frontend to the completed API endpoints.
8. Review deployment configuration and production security.



---



# License

This project is currently under private development.

License and distribution terms will be defined before public or commercial release.
