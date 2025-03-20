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

| Schema          | Field         | Explanation |
|---------------|--------------|-------------|
| **City** | name | The name of the city. It must have at least 3 characters and cannot contain numbers. |
| **Country** | name | The official name of the country. It must be at least 3 characters long and cannot contain numbers. |
|  | flag | A URL linking to the country's flag image. The image must be in JPG, JPEG, PNG, or GIF format. |
|  | population | The total number of people living in the country. It must be a non-negative number. |
|  | region | The geographical region where the country is located. It cannot contain numbers. |
|  | cities | A list of cities that belong to the country, referenced from the `City` schema. |
| **PasswordReset** | userId | A reference to the user who requested a password reset. |
|  | resetToken | A unique token generated for resetting the user's password. |
|  | expiresAt | The expiration date and time of the reset token. After this time, the token is no longer valid. |
| **RequestAccess** | userId | A reference to the user requesting access. |
|  | action | The type of access request being made, selected from predefined options in `RequestAccessAction`. |
|  | status | The current status of the request (e.g., pending, approved, or rejected). Defaults to `PENDING`. |
| **User** | firstName | The user's first name. It must be at least 2 characters long and contain only letters. |
|  | lastName | The user's last name. It must be at least 2 characters long and contain only letters. |
|  | username | A unique username for the user, consisting of letters, numbers, and underscores. |
|  | email | The user's email address, which must follow a valid email format. |
|  | phone | The user's phone number, which must start with '05' and have 10 digits. |
|  | profileImage | An optional profile image URL or filename for the user. Must be a valid image format. |
|  | password | The user's password, which must be at least 6 characters long. The password is hashed before storing. |
|  | accessLevel | Defines the user's level of access, selected from predefined values in `AccessLevel`. Defaults to `VIEWER`. |

---
#### Additional Information:
- **Timestamps**: The `Country`, `RequestAccess`, and `User` schemas automatically track creation and update times.
- **Password Security**: The `User` schema hashes passwords before saving them to the database.


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

