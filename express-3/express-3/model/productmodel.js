const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../DB/database');

const Product = sequelize.define(
    "product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Allows for prices with two decimal places
            allowNull: false,
            validate: {
                isDecimal: true, // Ensures the value is a decimal
                min: 0, // Ensures the price is not negative
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Default stock value
            validate: {
                min: 0, // Ensures stock is not negative
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "products",
        timestamps: true,
    }
);

module.exports = Product;
