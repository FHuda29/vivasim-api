const sql = require("./db.js");

// constructor
const Agent = function(agent) {
  this.AgentCode = agent.AgentCode;
  this.AgentID = agent.AgentID;
  this.IDType = agent.IDType;
  this.Name = agent.Name;
  this.Address = agent.Address;
  this.OfficePhone = agent.OfficePhone;
  this.ContactPerson = agent.ContactPerson;
  this.ContactPhone = agent.ContactPhone;
  this.Email = agent.Email;
  this.AccountManager = agent.AccountManager;
  this.ContractNumber = agent.ContractNumber;
  this.PaymentNote = agent.PaymentNote;
  this.BankName = agent.BankName;
  this.BankAccNo = agent.BankAccNo;
  this.BankAccName = agent.BankAccName;
  this.Commission = agent.Commission;
  this.JoinDate = agent.JoinDate;
  this.Status = agent.Status;
  this.Note = agent.Note;
};

Agent.create = (newAgent, result) => {
  sql.query("INSERT INTO tb_agent SET ?", newAgent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created agents: ", { Seq: res.Seq, ...newAgent });
    result(null, { Seq: res.Seq, ...newAgent });
  });
};

Agent.findById = (seq, result) => {
  sql.query(`SELECT * FROM tb_agent WHERE Seq = ${seq}`, (err, res) => {
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

Agent.getAll = (name, result) => {
  let query = "SELECT * FROM tb_agent";

  if (name) {
    query += ` WHERE Name LIKE '%${name}%'`;
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
    "UPDATE tb_agent SET AgentCode = ?, AgentID = ?, IDType = ?, Name = ?, Address = ?, OfficePhone  = ? , ContactPerson  = ?, Email  = ?, AccountManager  = ?, ContractNumber  = ?, PaymentNote  = ?, BankName  = ?, BankAccNo  = ?, BankAccName  = ?, Commission  = ?, JoinDate  = ?, Status  = ?, Note  = ? WHERE Seq = ?",
    [agent.AgentCode, agent.AgentID, agent.IDType, agent.Name, agent.Address, agent.OfficePhone, agent.ContactPerson, agent.Email, agent.AccountManager, agent.ContractNumber, agent.PaymentNote, agent.BankName, agent.BankAccNo, agent.BankAccName, agent.Commission, agent.JoinDate, agent.Status, agent.Note, seq],
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

      console.log("updated agent: ", { Seq: seq, ...agent });
      result(null, { Seq: seq, ...agent });
    }
  );
};

Agent.remove = (seq, result) => {
  sql.query("DELETE FROM tb_agent WHERE Seq = ?", seq, (err, res) => {
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
  sql.query("DELETE FROM tb_agent", (err, res) => {
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
