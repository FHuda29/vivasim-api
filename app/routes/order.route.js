module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", orders.create);
  
    // Retrieve all Product
    router.get("/", orders.findAll);

    router.get("/agent/:agent_code", orders.findByAgent);

    router.get("/status/:order_status", orders.getOrderByStatus);

    router.get("/id/:order_id", orders.findByOrderId);

    router.get("/update/:order_id/:order_status", orders.updateStatus);

    app.use('/api/orders', router);
};