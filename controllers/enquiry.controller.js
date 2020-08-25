const enquiry = require("../models/enquiry.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a enquiry
    const enquiry1 = new enquiry({
      picup_location: req.body.picup_location, 
      dropoff_location: req.body.dropoff_location, 
      picup_date: req.body.picup_date,
      picup_time: req.body.picup_time,
      vehicle_id: req.body.vehicle_id,
      mobile:req.body.mobile,
      email:req.body.email,
      fullname:req.body.fullname

    });
  
    // Save enquiry in the database
    enquiry.create(enquiry1, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Enquiry."
        });
      else res.send(data);
    });
  };