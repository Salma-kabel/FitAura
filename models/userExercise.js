const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const userExercise = sequelize.define('userExercise', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalCalories: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = userExercise;