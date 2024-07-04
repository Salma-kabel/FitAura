const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserInfo = sequelize.define('UserInfo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  goalWeight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalBodyFatPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalMuscleMassPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
    timestamps: true,
});

User.hasOne(UserInfo, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
UserInfo.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = UserInfo;
