const connection = require('../database');
const { DataTypes } = require('sequelize');
const Order = require('./orderModel');
const Variant = require('./productVariantsModel');

const OrderDetail = connection.define('OrderDetail', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_details',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

// Thiết lập quan hệ
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderDetail.belongsTo(Variant, { foreignKey: 'variant_id', as: 'variant' });

module.exports = OrderDetail;
