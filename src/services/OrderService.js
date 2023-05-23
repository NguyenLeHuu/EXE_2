const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");
const OrderDetailService = require("../services/OrderDetailService");

let sequelize = db.sequelize;

let getByCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({
        include: [
          {
            model: db.OrderDetail,
            attributes: ["orderdetailid", "productid", "quantity", "price"],
          },
        ],
        raw: false,
        nest: true,
        where: {
          customerid: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createOrder = (id, customerid) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let id = crypto.randomBytes(15).toString("hex");
      let data = await db.OrderCart.create({
        orderid: id,
        date: new Date(),
        totalmoney: 0,
        customerid: customerid,
        status: "cart",
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderStatus = (orderid, tracking) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.update(
        {
          date: new Date(),
          status: tracking,
        },
        {
          where: {
            orderid: orderid,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCartTotal = (orderid, totalmoney) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.update(
        {
          totalmoney: totalmoney,
        },
        {
          where: {
            orderid: orderid,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getByCustomer: getByCustomer,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  updateCartTotal: updateCartTotal,
};
