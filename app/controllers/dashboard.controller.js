const Dashboard = require("../models/dashboard.model.js");

exports.getTotalAgent = (req, res) => {
    Dashboard.getTotalAgent(req.params.agent_code, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalPartner = (req, res) => {
    Dashboard.getTotalPartner((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalDeposit = (req, res) => {
    Dashboard.getTotalDeposit((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalBasePrice = (req, res) => {
    Dashboard.getTotalBasePrice((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalInventory = (req, res) => {
    Dashboard.getTotalInventory((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

/*
exports.getTotalOrderStatus = (req, res) => {
    Dashboard.getTotalOrderStatus(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalOrderType = (req, res) => {
    Dashboard.getTotalOrderType(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalOrderChannel = (req, res) => {
    Dashboard.getTotalOrderChannel(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalOrderAgent = (req, res) => {
    Dashboard.getTotalOrderAgent(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalOrderProduct = (req, res) => {
    Dashboard.getTotalOrderProduct(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getTotalOrderAgentProduct = (req, res) => {
    Dashboard.getTotalOrderAgentProduct(req.params.cobrand_id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
*/