const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Routine = sequelize.define('Routine', {
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
}, {
    timestamps: true,
});

module.exports = Routine;
