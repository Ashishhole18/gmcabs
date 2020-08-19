const user = require("../models/user.model");






exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const user1 = new user({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    mobile:req.body.mobile
  });

  // Save Customer in the database
  user.create(user1, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};



exports.findOne = (req, res) => {
  user.findUser(req.params.phoneoremail,req.params.password, (err, data) => {
    if (err) {
      if (err.kind === "false") {
        res.status(404).send({
          message: `Not found user with mobile or email ${req.params.phoneoremail}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with mobile or email " + req.params.phoneoremail
        });
      }
    } else res.send(data);
  });
};





