Experiment 8: React + Spring Boot Full-Stack Integration
Overview

This project demonstrates secure full-stack integration between a React frontend and Spring Boot backend using:

REST APIs
JWT authentication
Global CORS configuration
Spring Security
Axios interceptors
HTTP response-code handling

The application includes public APIs, authentication workflows, and protected endpoints.

Course Competencies Covered

CO2: Build web applications using frameworks
CO4: Implement secure authentication mechanisms
Project Architecture
React (Frontend)
   │
   │ Axios / Fetch API
   ▼
Spring Boot REST API
   │
Spring Security + JWT
Backend
Spring Boot (Java 17)
REST controllers
JWT authentication
Stateless session handling
Global CORS configuration
Input validation with response codes
Frontend
React (Vite)
Axios interceptors
Fetch API example
React Router navigation
Protected routes
Token storage in localStorage
Features Implemented
1. Public API Integration

Endpoint:

GET /api/public/posts

Fetches posts from JSONPlaceholder and displays them in a table.

Implemented using:

Axios (PublicPostsTable.jsx)
Fetch API (PublicPostsTableFetch.jsx)

Displays:

Post ID
User ID
Title
Body

No authentication required.

2. User Registration

Endpoint:

POST /api/auth/register

Returns:

Status	Meaning
201	Registration successful
409	Username already exists
400	Validation error

Frontend handles each response code properly.

3. User Login with JWT

Endpoint:

POST /api/auth/login

Returns:

Status	Meaning
200	Login success + JWT token
401	Invalid credentials

Token is stored in:

localStorage

Automatically attached to protected requests.

4. Protected Product API

Endpoint:

POST /api/products

Requires:

Authorization: Bearer <token>

Returns:

Status	Meaning
201	Product created
401	Unauthorized
400	Validation error
JWT Security Implementation

Includes:

Token generation at login
Token validation filter
Authorization header parsing
1-hour expiration policy
Stateless session configuration

Spring Security protects all endpoints except:

/api/public/**
/api/auth/**
Axios Interceptor Logic

Automatically:

Request interceptor

Adds token to header:

Authorization: Bearer <token>
Response interceptor

Handles:

401 Unauthorized

Actions:

Removes token
Redirects to login page
CORS Configuration

Configured globally in:

CorsConfig.java

Allowed origin:

http://localhost:3000

Allowed methods:

GET POST PUT DELETE OPTIONS

Credentials support enabled.

Technology Stack
Backend
Technology	Version
Spring Boot	3.3.5
Java	17
Spring Security	Latest
JWT (JJWT)	HS256
Build Tool	Maven
Frontend
Technology	Version
React	18
Vite	5
React Router	6
Axios	1.x
CSS	Vanilla
Setup Instructions
Backend Setup

Navigate to backend folder:

cd backend

Run application:

mvn clean install
mvn spring-boot:run

Runs on:

http://localhost:8080

Optional JWT secret configuration:

jwt.secret=MyVerySecretKeyMyVerySecretKey12345
Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Run application:

npm run dev

Runs on:

http://localhost:3000
API Endpoints Summary
Public Endpoints
Method	Endpoint	Description
GET	/api/public/posts	Fetch posts
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Protected Endpoints
Method	Endpoint	Description
POST	/api/products	Create product

Header required:

Authorization: Bearer <token>
Application Flow
Registration Flow
User → Register Form
Frontend → POST /register
Backend → Validation
Response → 201 or 409
UI → Success/Error message
Login Flow
User → Login Form
Frontend → POST /login
Backend → Validate credentials
Backend → Generate JWT
Frontend → Store token
Redirect → Protected page
Protected Request Flow
User → Create Product
Axios → Attach JWT automatically
Backend → Validate token
Controller → Process request
Response → 201 Created

If token expires:

Backend → 401 Unauthorized
Frontend → Clear token
Redirect → Login page
Security Best Practices Applied
Stateless authentication
JWT expiration policy
Global CORS configuration
Authorization header validation
Secure protected routes
Structured error handling

Recommended improvements for production:

Store secret in environment variables
Enable HTTPS
Hash passwords using BCrypt
Restrict allowed origins
Folder Structure
experiment8-react-spring-boot
│
├── backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── security
│   └── service
│
└── frontend
    ├── src
    │   ├── api.js
    │   ├── App.jsx
    │   └── components
Learning Outcomes

This experiment demonstrates:

React–Spring Boot integration
REST API development
JWT authentication workflow
Protected route handling
Axios interceptor usage
HTTP response-code handling
Global CORS configuration