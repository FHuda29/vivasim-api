const Partner = require("../models/partner.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Partner can not be empty!"
    });
  }

  // Create a Partner
  const partner = new Partner({
    PartnerID: req.body.PartnerID,
    PartnerName: req.body.PartnerName,
    PartnerPIC: req.body.PartnerPIC,
    PaymentType: req.body.PaymentType,
    TotalInvoice: req.body.TotalInvoice,
    BasePrice: req.body.BasePrice,
    TotalProfit: req.body.TotalProfit
  });

  // Save Partner in the database
  Partner.create(partner, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Partners."
      });
    else res.send(data);
  });
};

// Retrieve all Partner from the database (with condition).
exports.findAll = (req, res) => {
  const partnerName = req.query.name;

  Partner.getAll(partnerName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving partners."
      });
    else res.send(data);
  });
};

// Find a single Partner by Seq
exports.findOne = (req, res) => {
    Partner.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};


// Update a Partner identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Partner can not be empty!"
    });
  }

  console.log(req.body);

  Partner.updateById(
    req.params.seq,
    new Partner(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Parner with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Parner with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Partner with the specified id in the request
exports.delete = (req, res) => {
    Partner.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found parner with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Partners with seq " + req.params.seq
        });
      }
    } else res.send({ message: `Partners was deleted successfully!` });
  });
};

// Delete all Partner from the database.
exports.deleteAll = (req, res) => {
    Partner.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all partners."
      });
    else res.send({ message: `All Partners were deleted successfully!` });
  });
};
