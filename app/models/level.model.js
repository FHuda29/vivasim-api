const sql = require("./db.js");

// constructor
const Level = function(level) {
  this.level_id = level.level_id;
  this.level_name = level.level_name;
};

Level.create = (newLevel, result) => {
    sql.query("INSERT INTO level_role SET ?", newLevel, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created level role: ", { seq: res.seq, ...newLevel });
      result(null, { seq: res.seq, ...newLevel });
    });
};

Level.findById = (seq, result) => {
    sql.query(`SELECT * FROM level_role WHERE seq = ${seq}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found level: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found level with the seq
      result({ kind: "not_found" }, null);
    });
};

Level.findByLevelCode = (level_code, result) => {
  sql.query(`SELECT * FROM level_role WHERE level_code = '${level_code}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found level: ", res);
      result(null, res);
      return;
    }

    // not found level with the seq
    result({ kind: "not_found" }, null);
  });
};

Level.getAll = (result) => {
    let query = "SELECT * FROM level_role ORDER BY level_name ASC";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("levels: ", res);
      result(null, res);
    });
};

Level.searchAll = (param, result) => {
    let query = "SELECT * FROM level_role ";
  
    if (param) {
        query += ` WHERE level_id LIKE '%${param}%'`;
        query += ` OR level_name LIKE '%${param}%'`;
    }
  
    console.log(query);

    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
  
        console.log("search level : ", res);
        result(null, res);
    });
};

Level.updateById = (seq, level, result) => {
    sql.query(
      "UPDATE level_role SET level_id = ?, level_name = ?  WHERE seq = ?",
      [level.level_id, level.level_name, seq],
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
  
        console.log("updated level: ", { seq: seq, ...level });
        result(null, { seq: seq, ...level });
      }
    );
  };
  
  Level.remove = (seq, result) => {
    sql.query("DELETE FROM level_role WHERE seq = ?", seq, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted level with seq: ", seq);
      result(null, res);
    });
  };

  module.exports = Level;