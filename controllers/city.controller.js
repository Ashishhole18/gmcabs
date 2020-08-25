const city = require("../models/city.model");

exports.getCity = (req,res) => {
    city.getCity((err, data) => {
      if (err) {
        if (err.kind === "false") {
          res.send('false');
        } else {
          res.status(500).send({
            message: "Error retrieving City"
          });
        }
      } else res.send(data);
    });
  };
  
  