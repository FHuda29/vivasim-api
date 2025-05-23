module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.create);
  
    // Retrieve all Product
    router.get("/", products.findAll);

    // Search all Product
    router.get("/search", products.searchAll);
  
    // Retrieve all status Product
    router.get("/status", products.findAllPublished);
  
    // Retrieve a single Product with id
    router.get("/:seq", products.findOne);

    // Retrieve a single Product with id
    router.get("/package/:package_id", products.findByPackageId);

    // Update a Product with id
    router.put("/:seq", products.update);
  
    // Delete a Product with id
    router.delete("/:seq", products.delete);
  
    // Delete all Product
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
  };
  