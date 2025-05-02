const Agent = require("../models/agent.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Agent can not be empty!"
    });
  }

  // Create a Agents
  const agent = new Agent({
    agent_code: req.body.agent_code,
    agent_id: req.body.agent_id,
    id_type: req.body.id_type,
    name: req.body.name,
    address: req.body.address,
    kelurahan: req.body.kelurahan,
    kecamatan: req.body.kecamatan,
    city: req.body.city,
    province: req.body.province,
    office_phone: req.body.office_phone,
    contact_person: req.body.contact_person,
    contact_phone: req.body.contact_phone,
    email: req.body.email,
    commission_pct: req.body.commission_pct,
    join_date: req.body.join_date,
    status: req.body.status,
    note: req.body.note,
    account_manager: req.body.account_manager,
    contract_no: req.body.contract_no,
    payment_note: req.body.payment_note,
    bank_name: req.body.bank_name,
    bank_acc_no: req.body.bank_acc_no,
    bank_acc_name: req.body.bank_acc_name,
    cobrand_id: req.body.cobrand_id
  });

  // Save agents in the database
  Agent.create(agent, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Agents."
      });
    else res.send(data);
  });
};

// Retrieve all Agents from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Agent.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving agents."
      });
    else res.send(data);
  });
};

// Find a single Product by Seq
exports.findOne = (req, res) => {
    Agent.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Agents with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Agents with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};

exports.findCobrand = (req, res) => {
  Agent.findByConbrand(req.params.cobrand_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Agents with id ${req.params.cobrand_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Agents with seq " + req.params.cobrand_id
        });
      }
    } else res.send(data);
  });
};

exports.findByAgent = (req, res) => {
  Agent.findByAgenCode(req.params.agent_code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Agents with id ${req.params.agent_code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Agents with seq " + req.params.agent_code
        });
      }
    } else res.send(data);
  });
};


// Update a Agents identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Agents can not be empty!"
    });
  }

  console.log(req.body);

  Agent.updateById(
    req.params.seq,
    new Agent(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Agents with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Agents with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Agents with the specified id in the request
exports.delete = (req, res) => {
    Agent.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found agents with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Agents with seq " + req.params.seq
        });
      }
    } else res.send({ message: `Agents was deleted successfully!` });
  });
};

// Delete all Agents from the database.
exports.deleteAll = (req, res) => {
    Agent.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all agents."
      });
    else res.send({ message: `All Agents were deleted successfully!` });
  });
};
