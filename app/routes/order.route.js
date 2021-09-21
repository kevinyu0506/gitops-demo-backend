module.exports = app => {
  const Orders = require("../controllers/order.controller.js");

  // Retrieve all Orders
  app.get("/api/orders", Orders.findAll);

  // Retrieve a single order with order id
  app.get("/api/orders/:orderId", Orders.findByOrderId);

  // Retrieve orders with customer name
  app.get("/api/customers/:customerName", Orders.findByCustomerName);
};
