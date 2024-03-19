const { DataTypes } = require ( 'sequelize');
const sequelize = require('../database');

const Categoria = sequelize.define('Categorias', {
  idcategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  },
  
  {
    timestamps: false,

  });

  module.exports = Categoria;