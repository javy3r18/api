const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Producto =sequelize.define('Productos', {
    idproducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    idmarca: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    
    {
        timestamps: false,
    });

    module.exports = Producto;