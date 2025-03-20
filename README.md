# Country Management System

![Alt text](screenshots/image.png)
AdminNation is a management system for handling countries, cities, and access requests. It allows administrators to manage users, approve or reject access requests, and perform operations on countries and cities. The system features a modern interface with authentication, forms, and dialogs.

## How to use?
#### 1. Clone the repo.
```sh
git clone https://github.com/Shirel1234/CountryManagement.git
```
#### 2. Open the project in VS code.

#### 3. Open new VS code terminal.

#### 4. Go inside the server folder, and install all the packages.
```sh
 cd server
 npm install
```
#### 5. Create .env file and fill up the credentials inside config folder (still inside server folder).
```
MONGODB_URI=your_mongodb_url
PORT=your_port
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=your_expires_in_number
EMAIL_USER=your_mail
EMAIL_PASS=your_mail_password
FRONTEND_URL=your_frontend_url
```
#### 6. Run the server.
```sh
npm run dev
```

#### 7. Open another new VS code terminal and go to client folder.
```sh
cd client
npm install
```
#### 8. Create .env file and fill up the credentials (still inside client folder).
```
VITE_BASE_URL=react_app_api
```

#### 9. Run the client.

```sh
npm run dev
```
## Features
- Manage users, countries, and cities.
- Handle access requests with approval/denial.
- Authentication with JWT.
- Modern UI built with React and TypeScript.
- API powered by Node.js and Express.
- Data stored in MongoDB.

## Tech Stack

### client
- React vite
- TypeScript
- Recoil (State Management)
- React Query (Data Fetching)
- SCSS (Styling)
- Yup + Formik (Forms)
- Router React (Navigation Management)
- MUI (UI-Material) for table and form styling
- Boundary Error for global error handling

### server
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Authentication (JWT, bcrypt)

### Testing
- Jest
- React Testing Library

## Database Schema Overview

| Schema          | Fields | Explanation |
|---------------|--------|-------------|
| **City** | `name` | Represents a city with a name that must contain only letters and be at least 3 characters long. |
| **Country** | `name`, `flag`, `population`, `region`, `cities` | Represents a country, including its name, flag (image URL), population count, region, and a list of cities it contains. |
| **PasswordReset** | `userId`, `resetToken`, `expiresAt` | Stores password reset requests, linking a user to a reset token with an expiration time. |
| **RequestAccess** | `userId`, `action`, `status` | Manages access requests from users, storing the requested action and the current status of the request. |
| **User** | `firstName`, `lastName`, `username`, `email`, `phone`, `profileImage`, `password`, `accessLevel` | Stores user information, including personal details, authentication credentials, and access permissions. |

---
### Additional Notes:
- **Timestamps**: The `Country`, `RequestAccess`, and `User` schemas automatically track creation and update times.
- **Password Security**: The `User` schema hashes passwords before storing them.
- **Relationships**: `Country` references `City`, `PasswordReset` and `RequestAccess` reference `User`.


## Security Measures

To protect the application from common security threats, the following middleware is implemented:

- **NoSQL Injection Protection** (`express-mongo-sanitize`):  
  Prevents attackers from injecting malicious queries into MongoDB by sanitizing user input.  
  ```js
  import mongoSanitize from "express-mongo-sanitize";
  app.use(mongoSanitize());

 - **XSS (Cross-Site Scripting) Protection** (`xss-clean`):  
  Prevents attackers from injecting malicious scripts into user input fields, which could execute in the browser and steal 
  sensitive data.  
  ```js
  import xssClean from "xss-clean";
  app.use(xssClean());
  ```
## Screenshots
(Add screenshots here to showcase the interface)

## Middleware Explanation

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

