module.exports = app => {
    const dashboard = require("../controllers/dashboard.controller.js");
  
    var router = require("express").Router();
  
    router.get("/total/partner", dashboard.getTotalPartner);
    router.get("/total/agent/:agent_code", dashboard.getTotalAgent);

    router.get("/total/deposit", dashboard.getTotalDeposit);
    router.get("/total/baseprice", dashboard.getTotalBasePrice);
    router.get("/total/inventory", dashboard.getTotalInventory);

    app.use('/api/dashboard', router);
};