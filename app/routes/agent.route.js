module.exports = app => {
    const agents = require("../controllers/agent.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Agent
    router.post("/", agents.create);
  
    // Retrieve all Agent
    router.get("/", agents.findAll);
  
    // Retrieve a single Agent with id
    router.get("/:seq", agents.findOne);
  
    // Update a Agent with id
    router.put("/:seq", agents.update);
  
    // Delete a Agent with id
    router.delete("/:seq", agents.delete);
  
    // Delete all Agent
    router.delete("/", agents.deleteAll);
  
    app.use('/api/agents', router);
  };
  