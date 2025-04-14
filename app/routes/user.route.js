module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", users.create);

    //login
    router.post("/login", users.login);

    // Retrieve all Product
    router.get("/", users.findAll);
  
    // Retrieve all status Product
    router.get("/status", users.findAllBlocked);
  
    // Retrieve a single Product with id
    router.get("/:seq", users.findOne);
  
    // Update a Product with id
    router.put("/:seq", users.update);
  
    // Delete a Product with id
    router.delete("/:seq", users.delete);
  
    // Delete all Product
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };
  