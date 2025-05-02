module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Inventory
    router.post("/", inventory.create);
  
    // Retrieve all Inventory
    router.get("/", inventory.findAll);

    // Search all Inventory
    router.get("/search", inventory.searchAll);
  
    router.get("/ccid", inventory.findCCIDRange);

    // Retrieve all status Inventory
    router.get("/status", inventory.findAllPublished);
  
    // Retrieve a single Inventory with id
    router.get("/:seq", inventory.findOne);
  
    // Retrieve a single Inventory with cobrand id
    router.get("/cobrand/:cobrand_id", inventory.findCobrand);

    router.get("/agent/:agent_code", inventory.findAgent);

    router.get("/summary/agent/:agent_code", inventory.inventorySummary);

    router.get("/summary/partner/:partner_code", inventory.inventorySummaryPartner);

    router.get("/summary/all", inventory.inventorySummaryAll);

    // Update a Inventory with id
    router.put("/:seq", inventory.update);

    router.put("/ccid/:ccid", inventory.updateByCCID);
  
    // Delete a Inventory with id
    router.delete("/:seq", inventory.delete);
  
    // Delete all Inventory
    router.delete("/", inventory.deleteAll);
  
    app.use('/api/inventory', router);
  };
  