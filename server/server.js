const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const exerciseRoutes = require('./routes/exercise');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/exercises', exerciseRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
