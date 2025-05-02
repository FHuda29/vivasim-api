const sql = require("./db.js");

const Dashboard = function() {};

Dashboard.getTotalPartner = (result) => {
    sql.query('SELECT count(*) as total_partner FROM cobrand', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("dashboard: ", res);
        result(null, res);
    });
};

Dashboard.getTotalAgent = (agent_code,result) => {
    if(agent_code === "1"){
        sql.query('SELECT count(*) as total_agent FROM agent', (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
        
            console.log("dashboard: ", res);
            result(null, res);
        });
    } else {
        sql.query('SELECT count(*) as total_agent FROM agent WHERE cobrand_id = ?', [agent_code], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
        
            console.log("dashboard: ", res);
            result(null, res);
        });
    }
};

Dashboard.getTotalDeposit = (result) => {
    sql.query('SELECT sum(payment_amount) as total_deposit FROM payment_cobrand', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("dashboard: ", res);
        result(null, res);
    });
};

Dashboard.getTotalBasePrice = (result) => {
    sql.query(`SELECT sum(order_product_total_price) as total FROM orders WHERE order_status='Paid'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("dashboard: ", res);
        result(null, res);
    });
};

Dashboard.getTotalInventory = (result) => {
    sql.query(`SELECT count(iccid) as total_inventory FROM inventory_blanksim`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("dashboard: ", res);
        result(null, res);
    });
};

module.exports = Dashboard;