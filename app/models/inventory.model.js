const sql = require("./db.js");

// constructor
const Inventory = function(inventory) {
  this.iccid = inventory.iccid;
  this.cobrand_id = inventory.cobrand_id;
  this.agent_code = inventory.agent_code;
  this.in_date = inventory.in_date;
  this.out_date = inventory.out_date;
  this.status = inventory.status;
  this.order_id = inventory.order_id;
  this.country_id = inventory.country_id;
  this.package_id = inventory.package_id;
  this.selling_price = inventory.selling_price;
  this.sim_type = inventory.sim_type;
};

Inventory.create = (newInventory, result) => {
  console.log("newInventory insert data: ",newInventory);  
  sql.query("INSERT INTO inventory_blanksim SET ?", newInventory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Inventory: ", { seq: res.seq, ...newInventory });
    result(null, { seq: res.seq, ...newInventory });
  });
};

Inventory.findById = (seq, result) => {
  sql.query(`SELECT * FROM inventory_blanksim WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Inventory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Inventory with the seq
    result({ kind: "not_found" }, null);
  });
};

Inventory.findByCobrand = (cobrand_id, result) => {
  sql.query(`SELECT * FROM inventory_blanksim WHERE cobrand_id = '${cobrand_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Inventory: ", res);
      result(null, res);
      return;
    }

    // not found Inventory with the seq
    result({ kind: "not_found" }, null);
  });
};

Inventory.findByAgent = (agent_code, result) => {
  sql.query(`SELECT * FROM inventory_blanksim WHERE agent_code = '${agent_code}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Inventory: ", res);
      result(null, res);
      return;
    }

    // not found Inventory with the seq
    result({ kind: "not_found" }, null);
  });
};


Inventory.getAll = (inventoryName, result) => {
  let query = "SELECT * FROM inventory_blanksim";

  if (inventoryName) {
    query += ` WHERE package_id LIKE '%${inventoryName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Inventorys: ", res);
    result(null, res);
  });
};

Inventory.getAllStatus = result => {
  sql.query("SELECT * FROM inventory_blanksim WHERE status='Ready'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Inventorys: ", res);
    result(null, res);
  });
};

Inventory.getSummaryByAgent = (agentCode, result)  => {
  sql.query(`SELECT cobrand_id,agent_code,sim_type, status,count(status) as quantity FROM inventory_blanksim WHERE agent_code = ? GROUP BY sim_type,status,cobrand_id,agent_code `, [agentCode], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Inventory Summary: ", res);
    result(null, res);
  });
};

Inventory.getSummaryByPartner = (partnerCode, result)  => {
  sql.query(`SELECT cobrand_id,agent_code,sim_type, status,count(status) as quantity FROM inventory_blanksim WHERE cobrand_id = ? GROUP BY sim_type,status,cobrand_id,agent_code `, [partnerCode], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Inventory Summary: ", res);
    result(null, res);
  });
};

Inventory.getSummaryAll = result => {
  sql.query("SELECT cobrand_id,agent_code,sim_type, status,count(status) as quantity FROM inventory_blanksim GROUP BY cobrand_id,status,sim_type,agent_code", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Inventorys: ", res);
    result(null, res);
  });
};

Inventory.searchAll = (param, result) => {
  let query = "SELECT * FROM inventory_blanksim";

  if (param) {
      query += ` WHERE iccid LIKE '%${param}%'`;
      query += ` OR cobrand_id LIKE '%${param}%'`;
      query += ` OR agent_code LIKE '%${param}%'`;
      query += ` OR in_date LIKE '%${param}%'`;
      query += ` OR out_date LIKE '%${param}%'`;
      query += ` OR status LIKE '%${param}%'`;
      query += ` OR order_id LIKE '%${param}%'`;
      query += ` OR country_id LIKE '%${param}%'`;
      query += ` OR package_id LIKE '%${param}%'`;
      query += ` OR selling_price LIKE '%${param}%'`;
      query += ` OR sim_type LIKE '%${param}%'`;
  }

  sql.query(query, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }

      console.log("search Inventorys : ", res);
      result(null, res);
  });
};


Inventory.getRangeCCID = (ccidStart,ccidEnd,conbrandId,agentCode, result) => {
  let query = "SELECT * FROM inventory_blanksim";
  console.log("ccidStart : ", ccidStart);
  console.log("ccidStart : ", ccidEnd);


  if (ccidStart && ccidEnd && conbrandId && agentCode) {
      query += ` WHERE iccid >= '${ccidStart}'`;
      query += ` AND iccid <= '${ccidEnd}'`;
      query += ` AND cobrand_id = '${conbrandId}'`;
      query += ` AND agent_code = '${agentCode}'`;
  }else{
      query += ` WHERE iccid >= '${ccidStart}'`;
      query += ` AND iccid <= '${ccidEnd}'`;
      //query += ` AND cobrand_id = '${conbrandId}'`;
  }

  sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("get list ccid: ", res);
      //result(null, res);
      
      for (let i = 0; i < res.length; i++) {
        /*
        const dataInventory = {
          seq: res[i].seq,
          iccid: res[i].iccid,
          cobrand_id: conbrandId,
          agent_code: res[i].agent_code,
          in_date: res[i].in_date,
          out_date: res[i].out_date,
          status: res[i].status,
          order_id: res[i].order_id,
          country_id: res[i].country_id,
          package_id: res[i].package_id,
          selling_price: res[i].selling_price,
          sim_type: res[i].sim_type
        };
        */
        //result(null, dataInventory);
        const seq = res[i].seq;
        //Inventory.updateById(seq, dataInventory, result);
        sql.query("UPDATE inventory_blanksim SET cobrand_id = ?, agent_code = ? WHERE seq = ?", [conbrandId, agentCode, seq], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        });
      }
      
      result(null, res);
  });
};

Inventory.updateById = (seq, inventory, result) => {
  sql.query(
    "UPDATE inventory_blanksim SET iccid = ?, cobrand_id = ?, agent_code = ?, in_date = ?, out_date = ?, status  = ?, order_id = ?, country_id = ?, package_id = ?, selling_price = ?, sim_type  = ? WHERE seq = ?",
    [inventory.iccid, inventory.cobrand_id, inventory.agent_code, inventory.in_date, inventory.out_date, inventory.status, inventory.order_id, inventory.country_id, inventory.package_id, inventory.selling_price, inventory.sim_type, seq],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Inventorys with the seq
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Inventorys: ", { seq: seq, ...inventory });
      result(null, { seq: seq, ...inventory });
    }
  );
};

Inventory.updateByCCID = (ccid, inventory, result) => {
  sql.query(
    "UPDATE inventory_blanksim SET out_date = ?, status  = ?, order_id = ?, country_id = ?, package_id = ?, selling_price = ? WHERE iccid = ?",
    [inventory.out_date, inventory.status, inventory.order_id, inventory.country_id, inventory.package_id, inventory.selling_price, ccid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Inventorys with the ccid
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Inventorys: ", { iccid: ccid, ...inventory });
      result(null, { iccid: ccid, ...inventory });
    }
  );
};

Inventory.remove = (seq, result) => {
  sql.query("DELETE FROM inventory_blanksim WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Inventorys with the seq
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Inventory with seq: ", seq);
    result(null, res);
  });
};

Inventory.removeAll = result => {
  sql.query("DELETE FROM inventory_blanksim", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Inventorys`);
    result(null, res);
  });
};

module.exports = Inventory;
