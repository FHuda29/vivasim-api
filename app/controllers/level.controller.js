const Level = require("../models/level.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            success: false,
            message: "Level can not be empty!"
        });
    }

    // Create a Level
    const level = new Level({
        level_id: req.body.level_id,
        level_name: req.body.level_name
    });

    // Save Level in the database
    Level.create(level, (err, data) => {
        if (err)
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error occurred while creating the Level."
            });
        else res.send({success: true, message: "Level created successfully!", data: data});
    });
}

exports.findAll = (req, res) => {
    Level.getAll((err, data) => {
        if (err)
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error occurred while retrieving levels."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Level.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: false,
                    message: `Not found level with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "Error retrieving level with id " + req.params.id
                });
            }
        } else res.send({success: true, message: "Level retrieved successfully!", data: data});
    });
};

exports.findLevelCode = (req, res) => {
    Level.findByLevelCode(req.params.level_code, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: false,
                    message: `Not found level with level_code ${req.params.level_code}.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "Error retrieving level with level_code " + req.params.level_code
                });
            }
        } else res.send(data);
    });
};

exports.searchAll = (req, res) => {
    const param = req.query.param;
    console.log(param);
    
    Level.searchAll(param, (err, data) => {
      if (err)
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while retrieving levels."
        });
      else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Level can not be empty!"
        });
    }

    Level.updateById(
        req.params.id,
        new Level(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        success: false,
                        message: `Not found level with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        success: false,
                        message: "Error updating level with id " + req.params.id
                    });
                }
            } else res.send({success: true, message: "Level updated successfully!", data: data});
        }
    );
};

exports.delete = (req, res) => {
    Level.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: false,
                    message: `Not found level with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "Could not delete level with id " + req.params.id
                });
            }
        } else res.send({ success: true, message: `Level was deleted successfully!` });
    });
};