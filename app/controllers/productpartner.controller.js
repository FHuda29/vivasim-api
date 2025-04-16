const ProductPartner = require("../models/productpartner.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Product partner can not be empty!"
    });
  }

  // Create a Product Partner
  const product = new ProductPartner({
    package_id: req.body.package_id,
    package_name: req.body.package_name,
    country: req.body.country,
    days: req.body.days,
    quota: req.body.quota,
    selling_price: req.body.selling_price,
    status: req.body.status,
    cobrand_id: req.body.cobrand_id
  });

  // Save Product in the database
  ProductPartner.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Products Partner."
      });
    else res.send({success: true, message: "Product created successfully!", products: data});
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const productName = req.query.productName;

  ProductPartner.getAll(productName, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving products partner."
      });
    else res.send(data);
  });
};

exports.searchAll = (req, res) => {
    const param = req.query.param;
  
    ProductPartner.searchAll(param, (err, data) => {
      if (err)
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while retrieving products partner."
        });
      else res.send(data);
    });
};

// Find a single Product by Seq
exports.findOne = (req, res) => {
    ProductPartner.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Product partner with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Error retrieving Product partner with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};

// find all published Product
exports.findAllPublished = (req, res) => {
    ProductPartner.getAllStatus((err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving products partner."
      });
    else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
        success: false,
        message: "Product partner can not be empty!"
    });
  }

  console.log(req.body);

  ProductPartner.updateById(
    req.params.seq,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            success: false,
            message: `Not found Product partner with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Error updating Product partner with seq " + req.params.seq
          });
        }
      } else res.send({success: true, message: "Product partner updated successfully!", products: data});
    }
  );
};

exports.updateSallingPrice = (req, res) => {
    // Validate Request
    if (!req.body.selling_price) {
      res.status(400).send({
          success: false,
          message: "Salling priceProduct partner can not be empty!"
      });
    }
  
    console.log(req.body.selling_price);
  
    ProductPartner.updateSallingPrice(
      req.params.seq,req.body.selling_price,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              success: false,
              message: `Not found Product partner with seq ${req.params.seq}.`
            });
          } else {
            res.status(500).send({
              success: false,
              message: "Error updating salling price Product partner with seq " + req.params.seq
            });
          }
        } else res.send({success: true, message: "Salling price Product partner updated successfully!"});
      }
    );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    ProductPartner.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            success: false,
            message: `Not found Product partner with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
            success: false,
            message: "Could not delete Product partner with seq " + req.params.seq
        });
      }
    } else res.send({ success: true, message: `Product partner was deleted successfully!` });
  });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
    ProductPartner.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while removing all products partner."
      });
    else res.send({ success: true, message: `All Products partner were deleted successfully!` });
  });
};
