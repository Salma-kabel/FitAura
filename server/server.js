const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const exerciseRoutes = require('./routes/exercise');
const routineRoutes = require('./routes/routine');
const userRoutes = require('./routes/user');


require('dotenv').config();

const Routine = require('./models/Routine');
const Exercise = require('./models/Exercise');
const User = require('./models/User');

Routine.hasMany(Exercise, {onDelete: 'CASCADE'});
Exercise.belongsTo(Routine);


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/user', userRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
