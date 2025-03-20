# Country Management System

## Description
AdminNation is a management system for handling countries, cities, and access requests. It allows administrators to manage users, approve or reject access requests, and perform operations on countries and cities. The system features a modern interface with authentication, forms, and dialogs.

## Features
- Manage users, countries, and cities.
- Handle access requests with approval/denial.
- Authentication with JWT.
- Modern UI built with React and TypeScript.
- API powered by Node.js and Express.
- Data stored in MongoDB.

## Tech Stack
### Frontend
- React vite
- TypeScript
- Recoil (State Management)
- React Query (Data Fetching)
- SCSS (Styling)
- Yup + Formik (Forms)
- Router React (Navigation Management)
- MUI (UI-Material) for table and form styling
- Boundary Error for global error handling

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Authentication (JWT, bcrypt)

### Testing
- Jest
- React Testing Library

## Screenshots
(Add screenshots here to showcase the interface)

## Installation & Setup
### Prerequisites
- Node.js & npm
- MongoDB installed or a cloud database (e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git


## More Explanations

### config
.env file 
MONGODB_URI=your_mongodb_url
PORT=your_port
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=your_expires_in_number
EMAIL_USER=your_mail
EMAIL_PASS=your_mail_password
FRONTEND_URL=your_fronted_url

### Authentication Middleware: `authenticateToken`  
Verifies user authentication using a JWT token:  

- Extracts the token from cookies or headers.  
- Denies access if no token is found.  
- Verifies and decodes the token to get user ID and access level.  
- Checks if the user exists; denies access if not.  
- Stores user details in `res.locals` for further requests.  

Used to protect routes requiring authentication.  


### Authorization Middleware: `checkAccessLevel`
The `checkAccessLevel` function ensures that a user has the required access level before proceeding. It:

- Retrieves the user ID and access level from `res.locals`.
- Denies access if the user is not authenticated.
- Grants access if the user's level meets or exceeds the required level.
- Logs and returns a `403 Forbidden` error if access is insufficient.

This middleware is used to restrict certain routes based on user permissions.

### Rate Limiting Middleware: `loginRateLimiter`  
Uses `express-rate-limit` to restrict login attempts:  

- Limits users to 5 login attempts per 15 minutes.  
- Returns an error message if the limit is exceeded.  
- Helps prevent brute-force attacks.  

Ensures secure and controlled login attempts.  

