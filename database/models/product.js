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
        onDelete: 'CASCADE',
        hooks: true,
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
    descripcion: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
    defaultScope: {
      attributes: {
        
        exclude: ['categoryId']
      }
    }
  });

  return Product;
};
