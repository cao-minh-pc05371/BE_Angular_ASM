const connection = require('../database');
const { DataTypes } = require('sequelize');

const Order = connection.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  address_id: {
    type: DataTypes.INTEGER
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
    defaultValue: 'pending'
  },
  note: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;