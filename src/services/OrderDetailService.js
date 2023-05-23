const db = require("../models/index");
const crypto = require("crypto");
const OrderService = require("./OrderService");

let sequelize = db.sequelize;

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findOne({
        attributes: ["idorder", "datetime", "totalmoney", "status", "tracking"],

        include: [
          {
            model: db.Customer,
            attributes: ["idcustomer", "name", "email"],
          },
          {
            model: db.OrderDetail,
            attributes: ["orderdetailid", "quantity", "totalprice"],
            include: [
              {
                model: db.Product,
                attributes: ["idproduct", "name", "image"],
                include: [
                  {
                    model: db.Collection,
                    attributes: ["idcollection", "name"],
                    include: [
                      {
                        model: db.Theme,
                        attributes: ["idtheme", "name"],
                        include: [
                          {
                            model: db.Creator,
                            attributes: ["idcreator", "name"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        where: {
          idorder: id,
        },
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderDetail = (orderdetailid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderDetail.findOne({
        where: {
          orderdetailid: orderdetailid,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let addOrderDetail = (quantity, orderid, productid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const price = await db.Product.findOne({
        attributes: ["price"],
        where: {
          productid: productid,
        },
      });
      const salername = await db.Saler.findOne({
        attributes: ["salername"],
        where: {
          salerid: salerid,
        },
      });
      let data = await db.OrderDetail.create({
        quantity: quantity,
        orderid: orderid,
        productid: productid,
        price: price,
        salername: salername,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderDetail = (orderdetailid, quantity) => {
  if (quantity !== 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.OrderDetail.update(
          {
            quantity: quantity,
          },
          {
            where: {
              orderdetailid: orderdetailid,
            },
          }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  } else deleteOrderDetail(orderdetailid);
};

let deleteOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderDetail.destroy({
        where: {
          orderdetailid: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  addOrderDetail: addOrderDetail,
  updateOrderDetail: updateOrderDetail,
  deleteOrderDetail: deleteOrderDetail,
  getOrderDetail,
};
