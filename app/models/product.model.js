const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.ProductID = product.ProductID;
  this.ProductName = product.ProductName;
  this.Country = product.Country;
  this.Days = product.Days;
  this.Quota = product.Quota;
  this.SellingPrice = product.SellingPrice;
  this.Status = product.Status;
};

Product.create = (newProduct, result) => {
  console.log("newProduct insert data: ",newProduct);  
  sql.query("INSERT INTO tb_product_master SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (seq, result) => {
  sql.query(`SELECT * FROM tb_product_master WHERE Seq = ${seq}`, (err, res) => {
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
  let query = "SELECT * FROM tb_product_master";

  if (productName) {
    query += ` WHERE ProductName LIKE '%${productName}%'`;
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
  sql.query("SELECT * FROM tb_product_master WHERE Status=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (seq, product, result) => {
  sql.query(
    "UPDATE tb_product_master SET ProductID = ?, ProductName = ?, Country = ?, Days = ?, Quota = ?, SellingPrice  = ?, Status  = ? WHERE Seq = ?",
    [product.ProductID, product.ProductName, product.Country, product.Days, product.Quota, product.SellingPrice, product.Status, seq],
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

      console.log("updated products: ", { Seq: seq, ...product });
      result(null, { Seq: seq, ...product });
    }
  );
};

Product.remove = (seq, result) => {
  sql.query("DELETE FROM tb_product_master WHERE Seq = ?", seq, (err, res) => {
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
  sql.query("DELETE FROM tb_product_master", (err, res) => {
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
