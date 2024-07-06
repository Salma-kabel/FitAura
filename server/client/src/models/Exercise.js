const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
}, {
    timestamps: true,
});

module.exports = Exercise;
