const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define(
  'Exercise',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    tableName: 'exercise',
    timestamps: true,
  }
);

module.exports = Exercise;
