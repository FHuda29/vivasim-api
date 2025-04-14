const sql = require("./db.js");

// constructor
const Partner = function(partner) {
  this.PartnerID = partner.PartnerID;
  this.PartnerName = partner.PartnerName;
  this.PartnerPIC = partner.PartnerPIC;
  this.PaymentType = partner.PaymentType;
  this.TotalInvoice = partner.TotalInvoice;
  this.BasePrice = partner.BasePrice;
  this.TotalProfit = partner.TotalProfit;
};

Partner.create = (newPartner, result) => {
  sql.query("INSERT INTO tb_partner SET ?", newPartner, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created partner: ", { partnerSeq: res.partnerSeq, ...newPartner });
    result(null, { partnerSeq: res.partnerSeq, ...newPartner });
  });
};

Partner.findById = (seq, result) => {
  sql.query(`SELECT * FROM tb_partner WHERE partnerSeq = ${seq}`, (err, res) => {
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

Partner.getAll = (PartnerName, result) => {
  let query = "SELECT * FROM tb_partner";

  if (PartnerName) {
    query += ` WHERE PartnerName LIKE '%${PartnerName}%'`;
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


Partner.updateById = (partnerSeq, partners, result) => {
  sql.query(
    "UPDATE tb_partner SET PartnerID = ?, PartnerName = ?, PartnerPIC = ?, PaymentType = ?, TotalInvoice = ?, BasePrice  = ? , TotalProfit  = ? WHERE partnerSeq = ?",
    [partners.PartnerID, partners.PartnerName, partners.PartnerPIC, partners.PaymentType, partners.TotalInvoice, partners.BasePrice, partners.TotalProfit, partnerSeq],
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

      console.log("updated partner: ", { partnerSeq: partnerSeq, ...partners });
      result(null, { partnerSeq: partnerSeq, ...partners });
    }
  );
};

Partner.remove = (partnerSeq, result) => {
  sql.query("DELETE FROM tb_partner WHERE partnerSeq = ?", partnerSeq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted partner with seq: ", partnerSeq);
    result(null, res);
  });
};

Partner.removeAll = result => {
  sql.query("DELETE FROM tb_partner", (err, res) => {
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
