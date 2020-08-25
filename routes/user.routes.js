module.exports = app => {
    const user = require("../controllers/user.controller");
    const local = require("../controllers/local.controller");
    const city = require("../controllers/city.controller");
    const enquiry = require("../controllers/enquiry.controller");
    const config=require('../config')
    const client=require("twilio")(config.accountSID,config.authToken)
    app.post("/newuser", user.create);
    app.get("/:phoneoremail&:password", user.findOne);
    app.get("/usermobile/:mobile", user.findUserMobile);
    app.get("/userdetails/:mobile", user.getUsersDetails);

    app.post("/api/create-enquiry", enquiry.create);
    app.get("/api/city", city.getCity);
    app.get("/api/local", local.getLocal);

    app.get('/login',(req,res)=>
{
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create(
            {
                to:`+${req.query.phonenumber}`,
                channel:req.query.channel
            }
        ).then((data)=>
        {
            res.status(200).send(data);
        })
})

app.get('/verify',(req,res)=>
{
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create(
            {
                to:`+${req.query.phonenumber}`,
                code:req.query.code
            }
        ).then((data)=>
        {
            res.status(200).send(data);
        })
})

    
};
