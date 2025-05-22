const Orders = require("../models/order.model.js");
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Orders can not be empty!"
    });
  }

  // Create a Product Partner
  const orders = new Orders({
    order_id: req.body.order_id,
    order_date: req.body.order_date,
    order_type: req.body.order_type,
    order_status: req.body.order_status,
    order_customer_name: req.body.order_customer_name,
    order_contact_phone: req.body.order_contact_phone,
    order_contact_wa: req.body.order_contact_wa,
    order_contact_email: req.body.order_contact_email,
    order_agent_code: req.body.order_agent_code,
    order_agent_name: req.body.order_agent_name,
    order_product: req.body.order_product,
    order_country_code: req.body.order_country_code,
    order_fup: req.body.order_fup,
    order_quota: req.body.order_quota,
    order_days: req.body.order_days,
    order_ccid: req.body.order_ccid,
    order_qty: req.body.order_qty,
    order_product_price: req.body.order_product_price,
    order_product_total_price: req.body.order_product_total_price
  });

  // Save Oreders in the database
  Orders.create(orders, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Orders."
      });
    else res.send({success: true, message: "Oreders created successfully!", orders: data});
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const agentCode = req.query.agent_code;

  Orders.getAll(agentCode, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

exports.findByAgent = (req, res) => {
    Orders.getByAgentCode(req.params.agent_code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders with agent code ${req.params.agent_code}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders with agent code " + req.params.agent_code
        });
      }
    } else res.send(data);
  });
};

exports.findByOrderId = (req, res) => {
  Orders.getByOrderId(req.params.order_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders with agent code ${req.params.order_id}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders with agent code " + req.params.order_id
        });
      }
    } else res.send(data);
  });
};

exports.getOrderByStatus = (req, res) => {
  Orders.getAllStatus(req.params.order_status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders with agent code ${req.params.order_status}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Orders with agent code " + req.params.order_status
        });
      }
    } else res.send(data);
  });
}
exports.updateStatus = (req, res) => {
  Orders.updateStatus(req.params.order_id,req.params.order_status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Orders with order_id ${req.params.order_id}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error update status Orders with order_id " + req.params.order_id
        });
      }
    } else res.send(data);
  });
};

exports.updateById = (req, res) => {
  Orders.updateById(
    req.params.seq,
    new Orders(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Orders with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Orders with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};