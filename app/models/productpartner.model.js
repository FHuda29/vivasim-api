const sql = require("./db.js");

// constructor
const ProductPartner = function(product) {
  this.package_id = product.package_id;
  this.package_name = product.package_name;
  this.country = product.country;
  this.days = product.days;
  this.quota = product.quota;
  this.selling_price = product.selling_price;
  this.status = product.status;
  this.cobrand_id = product.cobrand_id;
};

ProductPartner.create = (newProduct, result) => {
  console.log("newProduct insert data: ",newProduct);  
  sql.query("INSERT INTO country_sim_combination_partner SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product partner: ", { seq: res.seq, ...newProduct });
    result(null, { seq: res.seq, ...newProduct });
  });
};

ProductPartner.findById = (seq, result) => {
  sql.query(`SELECT * FROM country_sim_combination_partner WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product partner: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

ProductPartner.findByCobrand = (cobrand_id, result) => {
  sql.query(`SELECT * FROM country_sim_combination_partner WHERE cobrand_id = '${cobrand_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product partner: ", res);
      result(null, res);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};


ProductPartner.findByProductDetail = (country_code,days,quota, result) => {
  sql.query(`SELECT * FROM country_sim_combination_partner WHERE country = '${country_code}' AND days = ${days} AND quota = '${quota}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product partner: ", res);
      result(null, res);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

ProductPartner.searchAll = (param, result) => {
    let query = "SELECT * FROM country_sim_combination_partner";

    if (param) {
        query += ` WHERE package_id LIKE '%${param}%'`;
        query += ` OR package_name LIKE '%${param}%'`;
        query += ` OR country LIKE '%${param}%'`;
        query += ` OR days LIKE '%${param}%'`;
        query += ` OR quota LIKE '%${param}%'`;
        query += ` OR selling_price LIKE '%${param}%'`;
        query += ` OR cobrand_id LIKE '%${param}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log("search products partner: ", res);
        result(null, res);
    });
};

ProductPartner.getAll = (productName, result) => {
  let query = "SELECT * FROM country_sim_combination_partner";

  if (productName) {
    query += ` WHERE package_name LIKE '%${productName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products partner: ", res);
    result(null, res);
  });
};

ProductPartner.getAllStatus = result => {
  sql.query("SELECT * FROM country_sim_combination_partner WHERE status='Ready'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products partner: ", res);
    result(null, res);
  });
};

ProductPartner.updateSallingPrice = (seq, price, result) => {
    sql.query(
      "UPDATE country_sim_combination_partner SET  selling_price  = ? WHERE seq = ?", [price, seq],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found products with the seq
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated salling price products partner");
        result(null, { seq: seq, ...price });
      }
    );
};

ProductPartner.updateById = (seq, product, result) => {
  sql.query(
    "UPDATE country_sim_combination_partner SET package_id = ?, package_name = ?, country = ?, days = ?, quota = ?, selling_price  = ?, status  = ?, cobrand_id  = ? WHERE seq = ?",
    [product.package_id, product.package_name, product.country, product.days, product.quota, product.selling_price, product.status, product.cobrand_id, seq],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found products with the seq
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated products partner : ", { seq: seq, ...product });
      result(null, { seq: seq, ...product });
    }
  );
};

ProductPartner.remove = (seq, result) => {
  sql.query("DELETE FROM country_sim_combination_partner WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Products with the seq
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product partner with seq: ", seq);
    result(null, res);
  });
};

ProductPartner.removeAll = result => {
  sql.query("DELETE FROM country_sim_combination_partner", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products partner`);
    result(null, res);
  });
};

module.exports = ProductPartner;
