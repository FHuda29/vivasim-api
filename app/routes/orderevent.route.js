module.exports = app => {
    const orderevent = require("../controllers/orderevent.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", orderevent.create);
  
    // Retrieve all Product
    router.get("/", orderevent.findAll);

    router.get("/status/:event_name", orderevent.findByEventName);

    router.get("/id/:order_id", orderevent.findByOrderId);

    router.get("/username/:username", orderevent.findByUserName);

    app.use('/api/order/event', router);
};