const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const exerciseRoutes = require('./routes/exercise');
const routineRoutes = require('./routes/routine');

require('dotenv').config();

const Routine = require('./models/Routine');
const RoutineExercise = require('./models/RoutineExercise');
const Exercise = require('./models/Exercise');

Routine.hasMany(RoutineExercise, { foreignKey: 'routineId', as: 'routineExercises'});
RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId' });

RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId' });
Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId', as: 'routineExercises' });

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
