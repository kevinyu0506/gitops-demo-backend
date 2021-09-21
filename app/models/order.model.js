const sql = require("./db.js");

// constructor
const Order = function(Order) {
  this.customerId = Order.customerId;
  this.itemId = Order.itemId;
};

Order.findAll = result => {
  sql.query(`SELECT customers.customerName, orders.orderId FROM customers, orders WHERE customers.customerId = orders.customerId`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Orders: ", res);
    result(null, res);
  });
};

Order.findByOrderId = (orderId, result) => {
  sql.query(`SELECT orders.orderId, customers.customerName, items.itemName FROM orders, customers, items, order_items WHERE orders.orderId = ${orderId} AND orders.orderId = order_items.orderId AND orders.customerId = customers.customerId AND order_items.itemId = items.itemId`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Order: ", res);
      result(null, res);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.findByCustomerName = (customerName, result) => {
  sql.query(`SELECT customers.customerName, orders.orderId FROM customers, orders WHERE customers.customerName = "${customerName}" AND customers.customerId = orders.customerId`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found Order: ", res);
      result(null, res);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
    console.log("Orders: ", res);
  });
};

module.exports = Order;
