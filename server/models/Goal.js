const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Goal = sequelize.define(
  'Goal',
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
    currentValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goalValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'goals',
    timestamps: true,
  }
);

module.exports = Goal;
