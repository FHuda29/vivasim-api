const sql = require("./db.js");

// constructor
const Partner = function(partner) {
  this.master_id = partner.master_id;
  this.cobrand_id = partner.cobrand_id;
  this.cobrand_name = partner.cobrand_name;
  this.pic = partner.pic;
  this.deposit = partner.deposit;
  this.ar = partner.ar;
  //this.sms_internal_reply = partner.sms_internal_reply;
  this.payment_type = partner.payment_type;
};

Partner.create = (newPartner, result) => {
  sql.query("INSERT INTO cobrand SET ?", newPartner, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created partner: ", { seq: res.seq, ...newPartner });
    result(null, { seq: res.seq, ...newPartner });
  });
};

Partner.findById = (seq, result) => {
  sql.query(`SELECT * FROM cobrand WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found partner: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Partner.getAll = (name, result) => {
  let query = "SELECT * FROM cobrand";

  if (name) {
    query += ` WHERE cobrand_name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("partners: ", res);
    result(null, res);
  });
};


Partner.updateById = (seq, partners, result) => {
  sql.query(
    "UPDATE cobrand SET master_id = ?, cobrand_id = ?, cobrand_name = ?, pic = ?, deposit = ?, ar  = ? , sms_internal_reply  = ?, payment_type = ? WHERE seq = ?",
    [partners.master_id, partners.cobrand_id, partners.cobrand_name, partners.pic, partners.deposit, partners.ar, partners.sms_internal_reply, partners.payment_type, seq],
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

      console.log("updated partner: ", { seq: seq, ...partners });
      result(null, { seq: seq, ...partners });
    }
  );
};

Partner.remove = (seq, result) => {
  sql.query("DELETE FROM cobrand WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted partner with seq: ", seq);
    result(null, res);
  });
};

Partner.removeAll = result => {
  sql.query("DELETE FROM cobrand", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} partners`);
    result(null, res);
  });
};

module.exports = Partner;
