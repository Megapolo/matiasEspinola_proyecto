'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {as: "user",foreignKey: 'userId'});
      Order.belongsTo(models.Status, {as: "status",foreignKey: 'statusId'});
      Order.hasMany(models.CartItem, {as: "cartItem",foreignKey: 'cartItemId'});
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};