const Inventory = require("../models/inventory.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Product can not be empty!"
    });
  }

  // Create a Inventory
  const inventory = new Inventory({
    iccid: req.body.iccid,
    cobrand_id: req.body.cobrand_id,
    agent_code: req.body.agent_code,
    in_date: req.body.in_date,
    out_date: req.body.out_date,
    status: req.body.status,
    order_id: req.body.order_id,
    country_id: req.body.country_id,
    package_id: req.body.package_id,
    selling_price: req.body.selling_price,
    sim_type: req.body.sim_type
  });

  // Save Inventory in the database
  Inventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inventory."
      });
    else res.send(data);
  });
};

// Retrieve all Inventory from the database (with condition).
exports.findAll = (req, res) => {
  const packageId = req.query.packageId;

  Inventory.getAll(packageId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Inventory."
      });
    else res.send(data);
  });
};

exports.searchAll = (req, res) => {
    const param = req.query.param;
  
    Inventory.searchAll(param, (err, data) => {
      if (err)
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while retrieving Inventory."
        });
      else res.send(data);
    });
};

// Find a single Product by Seq
exports.findOne = (req, res) => {
    Inventory.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};

exports.findCobrand = (req, res) => {
  Inventory.findByCobrand(req.params.cobrand_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with cobrand_id ${req.params.cobrand_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with cobrand_id " + req.params.cobrand_id
        });
      }
    } else res.send(data);
  });
};

exports.findAgent = (req, res) => {
  Inventory.findByAgent(req.params.agent_code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with agent_code ${req.params.agent_code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with agent_code " + req.params.agent_code
        });
      }
    } else res.send(data);
  });
};

// find all published Product
exports.findAllPublished = (req, res) => {
    Inventory.getAllStatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Inventory."
      });
    else res.send(data);
  });
};

exports.inventorySummary = (req, res) => {
  Inventory.getSummaryByAgent(req.params.agent_code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inventory Summary with agent_code ${req.params.agent_code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inventory Summary with agent_code " + req.params.agent_code
        });
      }
    } else res.send(data);
  });
};

exports.inventorySummaryPartner = (req, res) => {
  Inventory.getSummaryByPartner(req.params.partner_code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inventory Summary with partner_code ${req.params.partner_code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inventory Summary with partner_code " + req.params.partner_code
        });
      }
    } else res.send(data);
  });
};

exports.inventorySummaryAll = (req, res) => {
  Inventory.getSummaryAll((err, data) => {  
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inventory Summary with All.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inventory Summary with All"
        });
      }
    } else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Product can not be empty!"
    });
  }

  console.log(req.body);

  Inventory.updateById(
    req.params.seq,
    new Inventory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateByCCID = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Product can not be empty!"
    });
  }

  console.log(req.body);

  Inventory.updateByCCID(
    req.params.ccid,
    new Inventory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with ccid ${req.params.ccid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with ccid " + req.params.ccid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
    Inventory.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with seq " + req.params.seq
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Inventory from the database.
exports.deleteAll = (req, res) => {
    Inventory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Inventory."
      });
    else res.send({ message: `All Inventory were deleted successfully!` });
  });
};



exports.findCCIDRange = (req, res) => {
    console.log("start: ",req.query.ccidstart);
    console.log("end: ",req.query.ccidend);

    const cobrand_id = req.query.cobrand_id;
    console.log("cobrand_id: ",cobrand_id);
    
    const agentCode = req.query.agent_code;

    //const packageId = req.query.packageId;
    Inventory.getRangeCCID(req.query.ccidstart, req.query.ccidend,cobrand_id,agentCode, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          message: `Not found Product with ${req.query.ccidstart} and ${req.query.ccidend}.`
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Error retrieving Product with " + req.query.ccidstart + " and " + req.query.ccidend
        });
      }
    } else {
      res.send({ success: true, message: `Product was updated successfully!`, data: data });
    }
  });
};