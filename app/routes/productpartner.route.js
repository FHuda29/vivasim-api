module.exports = app => {
    const products = require("../controllers/productpartner.controller.js");
  
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

    // Retrieve a single Product with cobrand id
    router.get("/cobrand/:cobrand_id", products.findByCobrand);

    router.get("/:country_code/:days/:quota", products.findByDetailProduct);

    // Update a Product with id
    router.put("/:seq", products.update);
    
    // Update a salling price Product with id
    router.put("/salling/:seq", products.updateSallingPrice);

    // Delete a Product with id
    router.delete("/delete/:seq", products.delete);
  
    // Delete all Product
    router.delete("/", products.deleteAll);
  
    app.use('/api/product/partner', router);
  };
  