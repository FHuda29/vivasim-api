module.exports = app => {
    const levels = require("../controllers/level.controller.js");

    var router = require("express").Router();

    // Create a new Level
    router.post("/", levels.create);

    // Search all levels
    router.get("/search", levels.searchAll);

    // Retrieve all Level
    router.get("/", levels.findAll);

    // Retrieve a single Level with id
    router.get("/:seq", levels.findOne);

    router.get("/code/:level_code", levels.findLevelCode);

    // Update a Level with id
    router.put("/:seq", levels.update);  

    // Delete a Level with id
    router.delete("/:seq", levels.delete);

    app.use('/api/levels', router);
};