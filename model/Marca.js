const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Marca = sequelize.define('Marcas', {
    idmarca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    idcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },

    {
        timestamps: false,
    });

    module.exports = Marca;