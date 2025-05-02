module.exports = app => {
    const agents = require("../controllers/agent.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Agent
    router.post("/", agents.create);
  
    // Retrieve all Agent
    router.get("/", agents.findAll);
  
    // Retrieve a single Agent with id
    router.get("/:seq", agents.findOne);
  
    // Retrive a single Agent with cobrand id
    router.get("/cobrand/:cobrand_id", agents.findCobrand);

    router.get("/code/:agent_code", agents.findByAgent);

    // Update a Agent with id
    router.put("/:seq", agents.update);
  
    // Delete a Agent with id
    router.delete("/:seq", agents.delete);
  
    // Delete all Agent
    router.delete("/", agents.deleteAll);
  
    app.use('/api/agents', router);
  };
  