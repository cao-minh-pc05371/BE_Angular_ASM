const connection = require('../database');
const { DataTypes } = require('sequelize');

const ProductVariant = connection.define('ProductVariant', {
  id: 
  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'product_variants',
  timestamps: true
});

module.exports = ProductVariant;
