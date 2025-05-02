const Country = require("../models/country.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Partner can not be empty!"
    });
  }

  // Create a Country
  const country = new Country({
    country_list: req.body.country_list,
    country_detail: req.body.country_detail,
    country_code: req.body.country_code,
    status: req.body.status
  });

  // Save Country in the database
  Country.create(country, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Country."
      });
    else res.send(data);
  });
};

// Retrieve all Country from the database (with condition).
exports.findAll = (req, res) => {
  const countryName = req.query.name;

  Country.getAll(countryName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving country."
      });
    else res.send(data);
  });
};

// Find a single Country by Seq
exports.findOne = (req, res) => {
    Country.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Country with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Country with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};


// Update a Country identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Partner can not be empty!"
    });
  }

  console.log(req.body);

  Country.updateById(
    req.params.seq,
    new Country(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Country with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Country with the specified id in the request
exports.delete = (req, res) => {
    Country.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found parner with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Country with seq " + req.params.seq
        });
      }
    } else res.send({ message: `Country was deleted successfully!` });
  });
};

// Delete all Country from the database.
exports.deleteAll = (req, res) => {
    Country.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all country."
      });
    else res.send({ message: `All Country were deleted successfully!` });
  });
};
