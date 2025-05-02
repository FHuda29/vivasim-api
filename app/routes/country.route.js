module.exports = app => {
    const country = require("../controllers/country.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Country
    router.post("/", country.create);
  
    // Retrieve all Country
    router.get("/", country.findAll);
  
    // Retrieve a single Country with id
    router.get("/:seq", country.findOne);
  
    // Update a Country with id
    router.put("/:seq", country.update);
  
    // Delete a Country with id
    router.delete("/:seq", country.delete);
  
    // Delete all Country
    router.delete("/", country.deleteAll);
  
    app.use('/api/country', router);
  };
  