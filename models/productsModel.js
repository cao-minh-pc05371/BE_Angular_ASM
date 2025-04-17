const connection = require('../database');
const { DataTypes } = require('sequelize');

const Category = require('./categoryModel');
const Brand = require('./brandsModel');

const Product = connection.define('Product', {
    id: 
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    visibility: {
        type: DataTypes.ENUM('visible', 'hidden'),
        defaultValue: 'visible'
    },
    featured: {
        type: DataTypes.ENUM('normal', 'featured'),
        defaultValue: 'normal'
    },
    stock: {
        type: DataTypes.INTEGER
    },
    category_id: {
        type: DataTypes.INTEGER
    },
    brand_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'products',
    timestamps: true
});

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

module.exports = Product;
