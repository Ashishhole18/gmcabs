const local = require("../models/local.model");

exports.getLocal = (req,res) => {
    local.getLocal((err, data) => {
      if (err) {
        if (err.kind === "false") {
          res.send('false');
        } else {
          res.status(500).send({
            message: "Error retrieving Local"
          });
        }
      } else res.send(data);
    });
  };
  
  