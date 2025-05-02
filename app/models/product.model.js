const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.package_id = product.package_id;
  this.package_name = product.package_name;
  this.country = product.country;
  this.days = product.days;
  this.quota = product.quota;
  this.selling_price = product.selling_price;
  this.status = product.status;
};

Product.create = (newProduct, result) => {
  console.log("newProduct insert data: ",newProduct);  
  sql.query("INSERT INTO country_sim_combination SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { seq: res.seq, ...newProduct });
    result(null, { seq: res.seq, ...newProduct });
  });
};

Product.findById = (seq, result) => {
  sql.query(`SELECT * FROM country_sim_combination WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Product.findPackageId = (package_id, result) => {
  sql.query(`SELECT * FROM country_sim_combination WHERE package_id = '${package_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};


Product.getAll = (productName, result) => {
  let query = "SELECT * FROM country_sim_combination";

  if (productName) {
    query += ` WHERE package_name LIKE '%${productName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.getAllStatus = result => {
  sql.query("SELECT * FROM country_sim_combination WHERE status='Ready'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.searchAll = (param, result) => {
  let query = "SELECT * FROM country_sim_combination";

  if (param) {
      query += ` WHERE package_id LIKE '%${param}%'`;
      query += ` OR package_name LIKE '%${param}%'`;
      query += ` OR country LIKE '%${param}%'`;
      query += ` OR days LIKE '%${param}%'`;
      query += ` OR quota LIKE '%${param}%'`;
      query += ` OR selling_price LIKE '%${param}%'`;
      query += ` OR status LIKE '%${param}%'`;
  }

  sql.query(query, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }

      console.log("search products : ", res);
      result(null, res);
  });
};

Product.updateById = (seq, product, result) => {
  sql.query(
    "UPDATE country_sim_combination SET package_id = ?, package_name = ?, country = ?, days = ?, quota = ?, selling_price  = ?, status  = ? WHERE seq = ?",
    [product.package_id, product.package_name, product.country, product.days, product.quota, product.selling_price, product.status, seq],
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

      console.log("updated products: ", { seq: seq, ...product });
      result(null, { seq: seq, ...product });
    }
  );
};

Product.remove = (seq, result) => {
  sql.query("DELETE FROM country_sim_combination WHERE seq = ?", seq, (err, res) => {
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

    console.log("deleted product with seq: ", seq);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM country_sim_combination", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;
