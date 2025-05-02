const sql = require("./db.js");

// constructor
const Orders = function(order) {
  this.order_id = order.order_id;
  this.order_date = order.order_date;
  this.order_type = order.order_type;
  this.order_status = order.order_status;
  this.order_customer_name = order.order_customer_name;
  this.order_contact_phone = order.order_contact_phone;
  this.order_contact_wa = order.order_contact_wa;
  this.order_contact_email = order.order_contact_email;
  this.order_agent_code = order.order_agent_code;
  this.order_agent_name = order.order_agent_name;
  this.order_product = order.order_product;
  this.order_country_code = order.order_country_code;
  this.order_fup = order.order_fup;
  this.order_quota = order.order_quota;
  this.order_days = order.order_days;
  this.order_ccid = order.order_ccid;
  this.order_qty = order.order_qty;
  this.order_product_price = order.order_product_price;
  this.order_product_total_price = order.order_product_total_price;
};

Orders.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created orders: ", { seq: res.seq, ...newOrder });
    result(null, { seq: res.seq, ...newOrder });
  });
};

Orders.findById = (seq, result) => {
  sql.query(`SELECT * FROM orders WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the seq
    result({ kind: "not_found" }, null);
  });
};

Orders.findPackageId = (package_id, result) => {
  sql.query(`SELECT * FROM orders WHERE order_product = '${package_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the seq
    result({ kind: "not_found" }, null);
  });
};


Orders.getAll = (agent_code, result) => {
  let query = "SELECT * FROM orders";

  if (agent_code) {
    query += ` WHERE order_agent_code LIKE '%${agent_code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Orders.getByAgentCode = (agent_code, result) => {
  sql.query(`SELECT * FROM orders WHERE order_agent_code='${agent_code}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Orders.getByOrderId = (order_id, result) => {
  sql.query(`SELECT * FROM orders WHERE order_id='${order_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Orders.getAllStatus = (status, result) => {
  sql.query(`SELECT * FROM orders WHERE status='${status}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Orders.searchAll = (param, result) => {
  let query = "SELECT * FROM orders";

  if (param) {
      query += ` WHERE order_id LIKE '%${param}%'`;
      query += ` OR order_product LIKE '%${param}%'`;
  }

  sql.query(query, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }

      console.log("search orders : ", res);
      result(null, res);
  });
};

Orders.updateById = (seq, orders, result) => {
  sql.query(
    "UPDATE orders SET order_id = ?, order_date = ?, order_type = ?, order_status = ?, order_customer_name = ?, order_contact_phone  = ?, order_contact_wa  = ?, order_contact_email = ?, order_agent_code = ?, order_agent_name = ?, order_product = ?, order_qty = ?, order_product_price = ?, order_product_total_price = ?  WHERE seq = ?",
    [orders.order_id, orders.order_date, orders.order_type, orders.order_status, orders.order_customer_name, orders.order_contact_phone, orders.order_contact_wa, orders.order_contact_email, orders.order_agent_code, orders.order_agent_name, orders.order_product, orders.order_qty,  orders.order_product_price,  orders.order_product_total_price, seq],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found orders with the seq
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated orders: ", { seq: seq, ...orders });
      result(null, { seq: seq, ...orders });
    }
  );
};

Orders.updateStatus = (orderId, status, result) => {
  sql.query("UPDATE orders SET order_status = ?  WHERE order_id = ?",
    [status, orderId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found orders with the seq
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { order_id: orderId});
    }
  );
};

Orders.remove = (seq, result) => {
  sql.query("DELETE FROM orders WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Orders detail with the seq
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order detail with seq: ", seq);
    result(null, res);
  });
};

Orders.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} order detail`);
    result(null, res);
  });
};

module.exports = Orders;
