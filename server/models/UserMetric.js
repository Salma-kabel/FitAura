const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserMetric = sequelize.define('UserMetric', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bodyFatPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  muscleMassPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  recordedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_metrics',
  timestamps: true,
});

module.exports = UserMetric;
