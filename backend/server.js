const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'fitAura_secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/exercises', require('./routes/exercises'));
app.use('/foods', require('./routes/foods'));
app.use('/dashboard', require('./routes/dashboard'));

// Serve static files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
