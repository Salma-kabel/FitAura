const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const exerciseRoutes = require('./routes/exercise');
const routineRoutes = require('./routes/routine');
const userInfoRoutes = require('./routes/userInfo');

require('dotenv').config();

const Routine = require('./models/Routine');
const RoutineExercise = require('./models/RoutineExercise');
const Exercise = require('./models/Exercise');
const User = require('./models/User');
const UserInfo = require('./models/UserInfo');

Routine.hasMany(RoutineExercise, { foreignKey: 'routineId', as: 'routineExercises'});
RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId' });

RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId' });
Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId', as: 'routineExercises' });

User.hasOne(UserInfo, { foreignKey: 'userId' });
UserInfo.belongsTo(User, { foreignKey: 'userId' });

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api', userInfoRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
