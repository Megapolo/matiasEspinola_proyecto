'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol, {as: "rol",foreignKey: 'rolId'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    provincia: DataTypes.INTEGER,
    localidad: DataTypes.INTEGER,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    code: DataTypes.STRING,
    img: DataTypes.STRING,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};