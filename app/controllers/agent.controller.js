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
    AgentCode: req.body.AgentCode,
    AgentID: req.body.AgentID,
    IDType: req.body.IDType,
    Name: req.body.Name,
    Address: req.body.Address,
    OfficePhone: req.body.OfficePhone,
    ContactPerson: req.body.ContactPerson,
    ContactPhone: req.body.ContactPhone,
    Email: req.body.Email,
    AccountManager: req.body.AccountManager,
    ContractNumber: req.body.ContractNumber,
    PaymentNote: req.body.PaymentNote,
    BankName: req.body.BankName,
    BankAccNo: req.body.BankAccNo,
    BankAccName: req.body.BankAccName,
    Commission: req.body.Commission,
    JoinDate: req.body.JoinDate,
    Status: req.body.Status,
    Note: req.body.Note
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
