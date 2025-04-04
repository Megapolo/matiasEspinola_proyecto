'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: "categoria",
        foreignKey: 'categoryId',
        targetKey: 'id' 
      });
      Product.hasMany(models.Image, {
        as: "images",
        foreignKey: 'productId'
      });
    }
  }

  Product.init({
    nombre: DataTypes.STRING,
    fabricante: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    descuento: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
    defaultScope: {
      attributes: {
        // ⚠️ Eliminar categoryId de la query
        exclude: ['categoryId']
      }
    }
  });

  return Product;
};
