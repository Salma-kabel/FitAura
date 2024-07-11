const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const exerciseRoutes = require('./routes/exercise');
const routineRoutes = require('./routes/routine');
const userRoutes = require('./routes/user');
const goalRoutes = require('./routes/goal');

require('dotenv').config();

const Routine = require('./models/Routine');
const Exercise = require('./models/Exercise');
const User = require('./models/User');
const Goal = require('./models/Goal');

User.hasMany(Routine, {
  foreignKey: 'userId',
  as: 'routines',
  onDelete: 'CASCADE',
});
Routine.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Exercise, {
  foreignKey: 'userId',
  as: 'exercises',
});
Exercise.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Goal, {
  foreignKey: 'userId',
  as: 'goals',
  onDelete: 'CASCADE',
});
Goal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Routine.hasMany(Exercise, {
  foreignKey: 'routineId',
  as: 'exercises',
  onDelete: 'CASCADE',
});
Exercise.belongsTo(Routine, { foreignKey: 'routineId', as: 'routine' });

const app = express();



app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//   res.redirect('/api/dashboard');
// });
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/user', userRoutes);
app.use('/api/goals', goalRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = app;
