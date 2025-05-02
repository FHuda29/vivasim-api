module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Users
    router.post("/", users.create);

    //login
    router.post("/login", users.login);

    // Search all users
    router.get("/search", users.searchAll);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve all status Users
    router.get("/status", users.findAllBlocked);
  
    // Retrieve a single Users with id
    router.get("/:seq", users.findOne);

    router.get("/cobrand/:cobrand_id", users.findByCobrand);

    // Update a Users with id
    router.put("/:seq", users.update);

    // Reset password a Users with id
    router.put("/reset/:seq", users.resetPwdUser);

    // Block a Users with id
    router.put("/block/:seq", users.blockandunblock);

    // Delete a Users with id
    router.delete("/:seq", users.delete);
  
    // Delete all Users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };
  