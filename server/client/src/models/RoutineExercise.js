const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoutineExercise = sequelize.define('RoutineExercise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  routineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: true,
});

module.exports = RoutineExercise;
