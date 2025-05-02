const OrderEvent = require("../models/orderevent.model.js");
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Orders can not be empty!"
    });
  }

  // Create a Order Events
  const orderEvent = new OrderEvent({
    order_id: req.body.order_id,
    event_name: req.body.event_name,
    event_date: req.body.event_date,
    username: req.body.username
  });

  // Save Oreders in the database
  OrderEvent.create(orderEvent, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Orders Events."
      });
    else res.send({success: true, message: "Oreders events created successfully!", orders: data});
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const orderID = req.query.order_id;

  OrderEvent.getAll(orderID, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving order events."
      });
    else res.send(data);
  });
};

exports.findByEventName = (req, res) => {
    OrderEvent.getByEventName(req.params.event_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders events with event name ${req.params.event_name}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders events with event name " + req.params.event_name
        });
      }
    } else res.send(data);
  });
};

exports.findByOrderId = (req, res) => {
    OrderEvent.getByOrderId(req.params.order_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders events with order id ${req.params.order_id}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders events with order id " + req.params.order_id
        });
      }
    } else res.send(data);
  });
};

exports.findByUserName = (req, res) => {
    OrderEvent.findUser(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders events with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders events with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};
