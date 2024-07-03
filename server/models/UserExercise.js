const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserExercise = sequelize.define('UserExercise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
    timestamps: true,
});

module.exports = UserExercise;
