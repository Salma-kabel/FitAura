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

Install dependencies:
```bash
npm i
```

Testing the Application
Run Backend Server:
```bash
npm run dev
```
Test API Endpoints:
Use [Postman](https://www.postman.com/mekky16/workspace/fitaura/collection/33357340-d19603db-483f-4e1a-86e5-8a0e455fcbd1?action=share&creator=33357340) to test the registration and login endpoints.


Next Steps
Implement additional features such as logging exercises, setting goals, and tracking progress.
Add chart visualization for fitness data.
Write unit and integration tests for both backend and frontend.
Prepare for deployment to a production environment.

[![StandWithPalestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/StandWithPalestine.svg)](https://techforpalestine.org/learn-more)
