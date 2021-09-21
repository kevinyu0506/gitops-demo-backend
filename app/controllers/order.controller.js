const Order = require("../models/order.model.js");

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    else res.send(data);
  });
};

// Find a single Order with an order id
exports.findByOrderId = (req, res) => {
  Order.findByOrderId(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with order id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Order with order id ${req.params.orderId}.`
        });
      }
    } else {
      let response = {
          orderId: data[0].orderId,
          customerName: data[0].customerName,
          itemName: data.map(order => {
            return order.itemName;
          })
      }
      res.send(response);
    }
  });
};

// Find a single Order with a customer name
exports.findByCustomerName = (req, res) => {
  Order.findByCustomerName(req.params.customerName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send(null);
        //res.status(404).send({
        //  message: `Not found Order with name ${req.params.customerName}.`
        //});
      } else {
        res.status(500).send({
          message: `Error retrieving Order with name ${req.params.customerName}.`
        });
      }
    } else res.send(data);
  });
};
