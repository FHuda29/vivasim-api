const Users = require("../models/user.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "User can not be empty!"
    });
  }

  // Create a User
  const user = new Users({
    user_name: req.body.user_name,
    session_name: req.body.session_name,
    password: req.body.password,
    session_level: req.body.session_level,
    blocked: req.body.blocked,
    failed: req.body.failed
  });

  // Save Users in the database
  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Users."
      });
    else res.send({success: true, message: "User created successfully!", users: data});
  });
};

//login
exports.login = (req, res) => {
  console.log(req.body);
  Users.login(req.body.username, req.body.password, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(200).send({
        success: false,
        message: `login failed User with username ${req.body.username}.`
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error retrieving Product with seq " + req.body.username
      });
    }
  } else {
    res.status(200).send({
      success: true,
      message: "login success User with seq " + req.body.username, 
      users: data
    });
  }
});
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const userName = req.query.userName;

  Users.getAll(userName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else res.send(data);
  });
};

// Find a single Product by Seq
exports.findOne = (req, res) => {
    Users.findById(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with seq " + req.params.seq
        });
      }
    } else res.send(data);
  });
};

// find all published Product
exports.findAllBlocked = (req, res) => {
    Users.getAllStatus(req.params.status, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving user" + req.params.seq
      });
    else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Users can not be empty!"
    });
  }

  console.log(req.body);

  Users.updateById(
    req.params.seq,
    new Users(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with seq ${req.params.seq}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with seq " + req.params.seq
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    Users.remove(req.params.seq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with seq ${req.params.seq}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with seq " + req.params.seq
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user."
      });
    else res.send({ message: `All User were deleted successfully!` });
  });
};
