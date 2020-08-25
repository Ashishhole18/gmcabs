const sql = require("./db");

const Local = function(local) {
 
    this.local_id = local.local_id;
    this.local_name = local.local_name;
    this.is_active = local.is_active;
  };

  Local.getLocal = (result) => {
    sql.query(`SELECT * FROM tbl_local WHERE is_active = 1`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found local: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "false" }, null);
    });
  };

  module.exports = Local;