const sql = require("./db");
const nodemailer=require("../config/mail.config");
const Enquiry = function(enquiry) {
 
    this.picup_location = enquiry.picup_location;
    this.dropoff_location = enquiry.dropoff_location;
    this.picup_date = enquiry.picup_date;
    this.picup_time= enquiry.picup_time;
    this.vehicle_id= enquiry.vehicle_id;
    this.fullname=enquiry.fullname;
    this.email=enquiry.email;
    this.mobile=enquiry.mobile;
  };

  Enquiry.create = (newenquiry, result) => {
    sql.query("INSERT INTO tbl_enquiry SET ?", newenquiry, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var mailerOptions={
        from:'developer.esenceweb@gmail.com',
        to:'developer.esenceweb@gmail.com',
        subject:'New Enquiry',
        text:`Hello admin we got new enquriry.\nEmail: ${newenquiry.email}\nFullname:${newenquiry.fullname}\nMobile Number: ${newenquiry.mobile}\nPickup location:${newenquiry.picup_location}\nPickup date:${newenquiry.picup_date}\nPick up time:${newenquiry.picup_time}`
      };
      nodemailer.sendMail(mailerOptions,function(error,info)
      {
        if(error)
        {
          console.log(error);
          
        }
        else{
          console.log('Email sent:'+info.response);
          
        }
      })
  
      console.log("created enquiry: ", { id: res.insertId, ...newenquiry });
      result(null, { id: res.insertId, ...newenquiry });
    });
  };


  module.exports = Enquiry;

