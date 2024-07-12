const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Routine = sequelize.define(
  'Routine',
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
  },
  {
    tableName: 'routines',
    timestamps: true,
  }
);

module.exports = Routine;
