# FitAura
## Backend Project Structure

## Project's Auth Structure

- `controllers/authController.js`: This file contains the logic for user registration and login.
- `middlewares/authMiddleware.js`: This file contains middleware to protect routes by verifying JWT tokens.
- `models/User.js`: This file defines the User model using Sequelize.
- `routes/auth.js`: This file sets up the authentication routes.
- `routes/protected.js`: This file sets up protected routes that require authentication.
- `.env.example`: Example environment variables file.
- `server.js`: Main entry point of the application.

## Requirments

## Database Configuration
Ensure MySQL is running and configured properly:
Start MySQL Service:
```bash
sudo systemctl start mysql
```
Create Database:
```sql
CREATE DATABASE fitaura;
```
Create MySQL User:
```sql
CREATE USER 'fitaura'@'localhost' IDENTIFIED BY 'your_db_password';
GRANT ALL PRIVILEGES ON fitaura.* TO 'fitaura'@'localhost';
FLUSH PRIVILEGES;
```
Authentication and Authorization
Implemented user registration and login using JWT for authentication. The JWT is signed with a secret key specified in the .env file and is used to authorize user requests.

## Installation

Install dotenv Module:
```bash
npm install dotenv
```

Install bcryptjs Module:
```bash
npm install bcryptjs
```

Install jsonwebtoken Module:
```bash
npm install jsonwebtoken
```

Testing the Application
Run Backend Server:
```bash
npx nodemon server.js
```
Test API Endpoints:
Use Postman or curl to test the registration and login endpoints:
Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"testuser", "email":"test@example.com", "password":"testpass"}'
```
Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com", "password":"testpass"}'
```
Protected Route (dashboard):
```bash
curl http://localhost:5000/api/dashboard \
-H "Authorization: Bearer <JWT_TOKEN>"
```

Exercises:
create exercise:
```bash
curl -X POST http://localhost:5000/api/exercises/exerciseinput \
-H "Content-Type: application/json" \
-d '{"name":"testexercise", "description":"testtest", "calories":10}'
```
log exercise:
Have to create at least one user and one exercise first.
```bash
curl -X POST http://localhost:5000/api/exercises/logexercise \
-H "Content-Type: application/json" \
-d '{"userId":1, "exerciseId":1, "duration":20}'
```

Next Steps
Implement additional features such as logging exercises, setting goals, and tracking progress.
Add chart visualization for fitness data.
Write unit and integration tests for both backend and frontend.
Prepare for deployment to a production environment.
