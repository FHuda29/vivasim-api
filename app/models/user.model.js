const sql = require("./db.js");
const md5 = require('md5');
// constructor
const Users = function(user) {
  this.user_name = user.user_name;
  this.session_name = user.session_name;
  this.password = md5(user.password);
  this.session_level = user.session_level;
  this.blocked = user.blocked;
  this.failed = user.failed;
};

Users.create = (newUsers, result) => {
  sql.query("INSERT INTO session SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created users: ", { seq: res.seq, ...newUsers });
    result(null, { seq: res.seq, ...newUsers });
  });
};

Users.login = (username,password, result) => {
  sql.query("SELECT seq, user_name, session_name, session_level, blocked, failed, last_login_time FROM session WHERE user_name = ? AND password = ?", [username,md5(password)], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("login users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found users with the username
    result({ kind: "not_found" }, null);
  });
};

Users.findById = (seq, result) => {
  sql.query(`SELECT seq, user_name, session_name, session_level, blocked, failed, last_login_time FROM session WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (userName, result) => {
  let query = "SELECT seq, user_name, session_name, session_level, blocked, failed, last_login_time FROM session";

  if (userName) {
    query += ` WHERE user_name LIKE '%${userName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Users.getAllStatus = (blocked, result) => {
  sql.query(`SELECT seq, user_name, session_name, session_level, blocked, failed, last_login_time FROM session WHERE blocked = ${blocked}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Users.updateById = (seq, users, result) => {
  sql.query(
    "UPDATE session SET user_name = ?, session_name = ?, password = ?, session_level = ?, blocked = ?, failed  = ? WHERE seq = ?",
    [users.user_name, users.session_name, users.password, users.session_level, users.blocked, users.failed, seq],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated users: ", { seq: seq, ...users });
      result(null, { seq: seq, ...users });
    }
  );
};

Users.remove = (seq, result) => {
  sql.query("DELETE FROM session WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with seq: ", seq);
    result(null, res);
  });
};

Users.removeAll = result => {
  sql.query("DELETE FROM session", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Users;
