const sql = require("./db.js");

// constructor
const OrderDetail = function(orderDetail) {
  this.order_id = orderDetail.order_id;
  this.order_line = orderDetail.order_line;
  this.country_name = orderDetail.country_name;
  this.start_date = orderDetail.start_date;
  this.end_date = orderDetail.end_date;
  this.days = orderDetail.days;
  this.selling_unit_price = orderDetail.selling_unit_price;
  this.selling_amount = orderDetail.selling_amount;
  this.estimated_cost = orderDetail.estimated_cost;
  this.cobrand_cost = orderDetail.cobrand_cost;
  this.status = orderDetail.status;
  this.upload_status = orderDetail.upload_status;
  this.upload_date = orderDetail.upload_date;
  this.package_id = orderDetail.package_id;
};

OrderDetail.create = (newOrder, result) => {
  sql.query("INSERT INTO order_detail SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created orders: ", { seq: res.seq, ...newOrder });
    result(null, { seq: res.seq, ...newOrder });
  });
};

OrderDetail.findById = (seq, result) => {
  sql.query(`SELECT * FROM order_detail WHERE seq = ${seq}`, (err, res) => {
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

OrderDetail.findPackageId = (package_id, result) => {
  sql.query(`SELECT * FROM order_detail WHERE package_id = '${package_id}'`, (err, res) => {
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


OrderDetail.getAll = (orderId, result) => {
  let query = "SELECT * FROM order_detail";

  if (orderId) {
    query += ` WHERE order_id LIKE '%${orderId}%'`;
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

OrderDetail.getAllStatus = (status, result) => {
  sql.query(`SELECT * FROM order_detail WHERE status='${status}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

OrderDetail.searchAll = (param, result) => {
  let query = "SELECT * FROM order_detail";

  if (param) {
      query += ` WHERE order_id LIKE '%${param}%'`;
      query += ` OR country_name LIKE '%${param}%'`;
      query += ` OR package_id LIKE '%${param}%'`;
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

OrderDetail.updateById = (seq, orders, result) => {
  sql.query(
    "UPDATE order_detail SET order_id = ?, order_line = ?, country_name = ?, start_date = ?, end_date = ?, days  = ?, selling_unit_price  = ?, selling_amount = ?, estimated_cost = ?, cobrand_cost = ?, status = ?, upload_status = ?, upload_date = ?, package_id = ?  WHERE seq = ?",
    [orders.order_id, orders.order_line, orders.country_name, orders.start_date, orders.end_date, orders.days, orders.selling_unit_price, orders.selling_amount, orders.estimated_cost, orders.cobrand_cost, orders.status, orders.upload_status, orders.upload_date, orders.package_id, seq],
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

OrderDetail.remove = (seq, result) => {
  sql.query("DELETE FROM order_detail WHERE seq = ?", seq, (err, res) => {
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

OrderDetail.removeAll = result => {
  sql.query("DELETE FROM order_detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} order detail`);
    result(null, res);
  });
};

module.exports = OrderDetail;
