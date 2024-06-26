## ```Verify the Application```

# Open your browser and navigate to:

```
http://localhost:3000
```

# Test the different routes
### To make sure everything is working as expected. For example:

* Registration Route: http://localhost:3000/register
* Login Route: http://localhost:3000/login
* Dashboard Route: http://localhost:3000/dashboard
* Exercises Route: http://localhost:3000/exercises
* Food Route: http://localhost:3000/food

# Test API Endpoints

### You can use tools like Postman or Insomnia to test your API endpoints:

## 1. Registration:

* Method: ```POST```
* URL: ```http://localhost:3000/auth/register```
* Body (JSON):

```json
{
  "email": "test@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "password123"
}
```


## 2. Login:

* Method: ```POST```
* URL: ```http://localhost:3000/auth/login```
* Body (JSON):

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```


## 3. Dashboard:

* Method: ```GET```
* URL: ```http://localhost:3000/dashboard```
* Headers:

```json
{
  "Cookie": "session_id=YOUR_SESSION_ID"
}
```

## 4. Exercises:

* Method: ```GET```
* URL:```http://localhost:3000/exercises```

## 5. Food:

* Method: ``GET``
* URL: ```http://localhost:3000/food```


# ```Directory Structure```

### Here’s the final project directory structure:

```shell

fitAura/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── exercises.js
│   │   ├── foods.js
│   │   └── dashboard.js
│   ├── db.js
│   └── server.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   └── index.html
├── package.json
└── README.md

```