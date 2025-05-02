const sql = require("./db.js");

// constructor
const Country = function(country) {
  this.country_list = country.country_list;
  this.country_detail = country.country_detail;
  this.country_code = country.country_code;
  this.status = country.status;
};

Country.create = (newCountry, result) => {
  sql.query("INSERT INTO country_sim SET ?", newCountry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created country: ", { seq: res.seq, ...newCountry });
    result(null, { seq: res.seq, ...newCountry });
  });
};

Country.findById = (seq, result) => {
  sql.query(`SELECT * FROM country_sim WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found country: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Country.getAll = (name, result) => {
  let query = "SELECT * FROM country_sim";

  if (name) {
    query += ` WHERE country_detail LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("country: ", res);
    result(null, res);
  });
};


Country.updateById = (seq, country, result) => {
  sql.query(
    "UPDATE country_sim SET country_list = ?, country_detail = ?, country_code = ?, status = ? WHERE seq = ?",
    [country.country_list, country.country_detail, country.country_code, country.status, seq],
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

      console.log("updated partner: ", { seq: seq, ...country });
      result(null, { seq: seq, ...country });
    }
  );
};

Country.remove = (seq, result) => {
  sql.query("DELETE FROM country_sim WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted country with seq: ", seq);
    result(null, res);
  });
};

Country.removeAll = result => {
  sql.query("DELETE FROM country_sim", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} country`);
    result(null, res);
  });
};

module.exports = Country;
