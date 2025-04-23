const connection = require('../database');
const { DataTypes } = require('sequelize');

const Payment = connection.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  payment_method: {
    type: DataTypes.ENUM('COD', 'Momo'),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
    allowNull: true
  }
}, {
  tableName: 'payments',
  timestamps: true // để dùng createdAt và updatedAt
});

const Order = require('./orderModel');
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

module.exports = Payment;
