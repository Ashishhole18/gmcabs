const sql = require("./db");

const User = function(user) {
 
    this.fullname = user.fullname;
    this.email = user.email;
    this.password = user.password;
    this.mobile=user.mobile;
  };

 //create new user
  User.create = (newuser, result) => {
    sql.query("INSERT INTO tbl_users SET ?", newuser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created staff: ", { id: res.insertId, ...newuser });
      result(null, { id: res.insertId, ...newuser });
    });
  };

  //find user is present in database
  User.findUser = (phoneoremail,password, result) => {
    sql.query(`SELECT * FROM tbl_users WHERE (mobile = '${phoneoremail}' || email= '${phoneoremail}') && password='${password}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "false" }, null);
    });
  };
  module.exports = User;