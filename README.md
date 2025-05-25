# IMF Gadget Management System API

A secure API for managing IMF gadgets, built with Node.js, Express, and PostgreSQL.

## Features

- Complete CRUD operations for gadgets
- Random mission success probability calculation
- Self-destruct sequence with confirmation codes
- JWT Authentication
- PostgreSQL database with Sequelize ORM
- Status-based filtering
- Soft delete functionality

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd imf-gadget-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_NAME=imf_gadgets
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

4. Create the database:
```bash
createdb imf_gadgets
```

5. Run migrations:
```bash
npx sequelize-cli db:migrate
```

6. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login and get JWT token

### Gadgets
- GET /gadgets - Get all gadgets
- GET /gadgets?status={status} - Get gadgets by status
- POST /gadgets - Create a new gadget
- PATCH /gadgets/:id - Update a gadget
- DELETE /gadgets/:id - Decommission a gadget
- POST /gadgets/:id/self-destruct - Trigger self-destruct sequence

## Documentation

API documentation is available at `/api-docs` when running the server.

## Testing

Run tests with:
```bash
npm test
```

## Security

- JWT authentication
- Password hashing
- Input validation
- Rate limiting
- CORS enabled

## License

MIT 