const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Product can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    ProductID: req.body.ProductID,
    ProductName: req.body.ProductName,
    Country: req.body.Country,
    Days: req.body.Days,
    Quota: req.body.Quota,
    SellingPrice: req.body.SellingPrice,
    Status: req.body.Status
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Products."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const productName = req.query.productName;

  Product.getAll(productName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find a single Product by Seq
exports.findOne = (req, res) => {
    Product.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};

// find all published Product
exports.findAllPublished = (req, res) => {
    Product.getAllStatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
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

  Product.updateById(
    req.params.seq,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    Product.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with seq " + req.params.seq
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
