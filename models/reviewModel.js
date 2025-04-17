const connection = require('../database');
const { DataTypes } = require('sequelize');

const Review = connection.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER
    },
    comment: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'reviews',
    timestamps: true
});

module.exports = Review;