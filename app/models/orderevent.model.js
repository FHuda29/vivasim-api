const sql = require("./db.js");

// constructor
const OrdersEvent = function(orderEvent) {
  this.order_id = orderEvent.order_id;
  this.event_name = orderEvent.event_name;
  this.event_date = orderEvent.event_date;
  this.username = orderEvent.username;
};

OrdersEvent.create = (orderEvent, result) => {
  sql.query("INSERT INTO order_event SET ?", orderEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order events: ", { seq: res.seq, ...orderEvent });
    result(null, { seq: res.seq, ...orderEvent });
  });
};

OrdersEvent.findById = (seq, result) => {
  sql.query(`SELECT * FROM order_event WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order events: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the seq
    result({ kind: "not_found" }, null);
  });
};

OrdersEvent.findUser = (username, result) => {
  sql.query(`SELECT * FROM order_event WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order events: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order events with the seq
    result({ kind: "not_found" }, null);
  });
};


OrdersEvent.getAll = (orderId, result) => {
  let query = "SELECT * FROM order_event";

  if (orderId) {
    query += ` WHERE order_id = '${orderId}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order events: ", res);
    result(null, res);
  });
};



OrdersEvent.getByOrderId = (order_id, result) => {
  sql.query(`SELECT * FROM order_event WHERE order_id='${order_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

OrdersEvent.getByEventName = (event_name, result) => {
  sql.query(`SELECT * FROM order_event WHERE event_name='${event_name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order events: ", res);
    result(null, res);
  });
};


module.exports = OrdersEvent;
