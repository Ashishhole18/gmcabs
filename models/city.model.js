const sql = require("./db");

const City = function(city) {
 
    this.city_id = city.city_id;
    this.state_id = city.state_id;
    this.city_name = city.city_name;
    this.is_active= city.is_active;
  };

  City.getCity = (result) => {
    sql.query(`SELECT * FROM tbl_users WHERE is_active = 1`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found city: ", res);
        result(null, res);
        return;
      }
  
      result({ kind: "false" }, null);
    });
  };

  module.exports = City;