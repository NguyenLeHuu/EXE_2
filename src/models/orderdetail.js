"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Product, { foreignKey: "productid" });
      OrderDetail.belongsTo(models.Order, { foreignKey: "orderid" });
    }
  }
  OrderDetail.init(
    {
      orderdetailid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      quantity: DataTypes.STRING,
      orderid: DataTypes.STRING,
      productid: DataTypes.STRING,
      rating: DataTypes.STRING,
      feedback: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      salername: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
