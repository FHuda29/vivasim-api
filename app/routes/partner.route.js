module.exports = app => {
    const partners = require("../controllers/partner.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Partner
    router.post("/", partners.create);
  
    // Retrieve all Partner
    router.get("/", partners.findAll);
  
    // Retrieve a single Partner with id
    router.get("/:seq", partners.findOne);
  
    // Update a Partner with id
    router.put("/:seq", partners.update);
  
    // Delete a Partner with id
    router.delete("/:seq", partners.delete);
  
    // Delete all Partner
    router.delete("/", partners.deleteAll);
  
    app.use('/api/partners', router);
  };
  