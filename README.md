# Blog MVC

A full-stack blog application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

This project was developed as a practical backend learning project. The main goal was to gain hands-on experience with backend development, authentication, authorization, database operations, MVC architecture, validation, and server-side rendering.

---

## Features

- User registration and login
- JWT-based authentication
- Authentication using HTTP-only cookies
- Role-based authorization
- User roles: User, Author, Admin
- User profile management
- Create, edit, and delete posts
- Publish and manage posts
- Category management
- Create, edit, and delete categories
- Create comments on posts
- Comment moderation
- Approve, reject, and delete comments
- Admin dashboard
- User management
- Form validation
- Flash messages
- Custom 404 page
- Server error handling
- Server-side rendering with EJS

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- EJS

### Validation & Middleware

- Zod
- Express Session
- Connect Flash
- Cookie Parser

### Frontend

- EJS
- Tailwind CSS
- Alpine.js
- Lucide Icons

---

## Authentication & Authorization

Authentication is implemented using JSON Web Tokens (JWT).

After a successful login, the JWT is stored in an HTTP-only cookie and is used to authenticate protected requests.

The application also uses role-based authorization to restrict access to different parts of the application.

### User Roles

| Role | Access |
|------|--------|
| User | Public features and personal profile |
| Author | Post and category management |
| Admin | Administrative features and user management |

---

## Main Sections

### Public Section

Users can:

- View published posts
- View post details
- Browse categories
- Read approved comments
- Register
- Login

### User Section

Authenticated users can:

- View their profile
- Update their username
- Change their password
- Submit comments

### Admin Section

Authorized users can:

- View the dashboard
- Manage posts
- Create and edit posts
- Manage categories
- Moderate comments
- Manage users
- Change user roles

---

## Project Architecture

The project follows an MVC-based structure.

```text
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validation/
├── utils/
├── views/
└── app.js
```

### Controllers

Responsible for handling application logic and generating responses.

### Models

Define MongoDB schemas and data models using Mongoose.

### Routes

Define application endpoints and connect them to controllers and middleware.

### Middlewares

Handle authentication, authorization, validation, errors, and other request-related tasks.

### Validation

Contains validation logic for incoming form data and requests.

### Views

EJS templates used for server-side rendering.

---

## Database

The application uses MongoDB as its database and Mongoose as the ODM.

Main entities include:

- Users
- Posts
- Categories
- Comments

Relationships between related documents are handled using MongoDB references and Mongoose `populate()`.

---

## Error Handling

The application includes:

- Custom 404 handling
- Server error handling
- Validation error handling
- Authentication error handling
- Flash messages for user-facing errors and success messages

---

## What I Learned

This project helped me gain practical experience with:

- Node.js backend development
- Express.js
- MVC architecture
- RESTful routing
- Middleware
- Authentication
- Authorization
- JWT
- HTTP-only cookies
- Role-based access control
- MongoDB
- Mongoose
- CRUD operations
- Data validation
- Error handling
- Flash messages
- EJS and server-side rendering
- MongoDB relationships and `populate()`
- Structuring a backend application
- Debugging backend applications
- Working with AI as a development and debugging assistant

---

## Project Goals

The main purpose of this project was not to create a production-ready blogging platform.

The goal was to understand how the different parts of a backend application work together:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Model
   ↓
MongoDB
   ↓
Response
```

The project was built to move from theoretical knowledge toward practical backend development and to develop the ability to understand, debug, and extend a real application.

---

## Future Improvements

Possible improvements for a future version include:

- Access Token / Refresh Token authentication
- REST API for a separate React/Next.js frontend
- Swagger / OpenAPI documentation
- File upload and image storage
- More granular authorization policies
- Automated tests
- Rate limiting
- Additional security improvements
- Pagination
- Advanced search and filtering
- Better API architecture

---

## Status

**Completed**

This project is considered a completed learning project.

It is not intended to be a production-ready blogging platform. The primary purpose was to build a practical understanding of backend development using Node.js, Express.js, MongoDB, and EJS.
