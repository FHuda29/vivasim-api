const sql = require("./db.js");

// constructor
const Agent = function(agent) {
  this.agent_code = agent.cobrand_id + "-" +agent.agent_code;
  this.agent_id = agent.agent_id;
  this.id_type = agent.id_type;
  this.name = agent.name;
  this.address = agent.address;
  this.kelurahan = agent.kelurahan;
  this.kecamatan = agent.kecamatan;
  this.city = agent.city;
  this.province = agent.province;
  this.office_phone = agent.office_phone;
  this.contact_person = agent.contact_person;
  this.contact_phone = agent.contact_phone;
  this.email = agent.email;
  this.commission_pct = agent.commission_pct;
  this.join_date = agent.join_date;
  this.status = agent.status;
  this.note = agent.note;
  this.account_manager = agent.account_manager;
  this.contract_no = agent.contract_no;
  this.payment_note = agent.payment_note;
  this.bank_name = agent.bank_name;
  this.bank_acc_no = agent.bank_acc_no;
  this.bank_acc_name = agent.bank_acc_name;
  this.cobrand_id = agent.cobrand_id;
};

Agent.create = (newAgent, result) => {
  sql.query("INSERT INTO agent SET ?", newAgent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created agents: ", { seq: res.seq, ...newAgent });
    result(null, { seq: res.seq, ...newAgent });
  });
};

Agent.findById = (seq, result) => {
  sql.query(`SELECT * FROM agent WHERE seq = ${seq}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found agents: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Agent.findByConbrand = (cobrand_id, result) => {
  sql.query(`SELECT * FROM agent WHERE cobrand_id = '${cobrand_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found agents: ", res);
      result(null, res);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Agent.findByAgenCode = (agentCode, result) => {
  sql.query(`SELECT * FROM agent WHERE agent_code = '${agentCode}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found agents: ", res);
      result(null, res);
      return;
    }

    // not found product with the seq
    result({ kind: "not_found" }, null);
  });
};

Agent.getAll = (name, result) => {
  let query = "SELECT * FROM agent";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("agents: ", res);
    result(null, res);
  });
};


Agent.updateById = (seq, agent, result) => {
  sql.query(
    "UPDATE agent SET agent_code = ?, agent_id = ?, id_type = ?, name = ?, address = ?, kelurahan  = ? , kecamatan  = ?, city  = ?, province  = ?, office_phone  = ?, contact_person  = ?, contact_phone  = ?, email  = ?, commission_pct  = ?, join_date  = ?, status  = ?, note  = ?, account_manager  = ?, contract_no  = ?, payment_note  = ?, bank_name  = ?, bank_acc_no  = ?, bank_acc_name  = ?, cobrand_id  = ? WHERE seq = ?",
    [agent.agent_code, agent.agent_id, agent.id_type, agent.name, agent.address, agent.kelurahan, agent.kecamatan, agent.city, agent.province, agent.office_phone, agent.contact_person, agent.contact_phone, agent.email, agent.commission_pct, agent.join_date, agent.status, agent.note, agent.account_manager, agent.contract_no, agent.payment_note, agent.bank_name, agent.bank_acc_no, agent.bank_acc_name, agent.cobrand_id, seq],
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

      console.log("updated agent: ", { seq: seq, ...agent });
      result(null, { seq: seq, ...agent });
    }
  );
};

Agent.remove = (seq, result) => {
  sql.query("DELETE FROM agent WHERE seq = ?", seq, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted agent with seq: ", seq);
    result(null, res);
  });
};

Agent.removeAll = result => {
  sql.query("DELETE FROM agent", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} agents`);
    result(null, res);
  });
};

module.exports = Agent;
