var PORT=process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const config=require('./config')
app.use(cors());
const client=require("twilio")(config.accountSID,config.authToken)

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.get('/',(req,res)=>{
    res.send("HEllo");
})
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







// parse requests of content-type: application/json
app.use(bodyParser.json());
require("./routes/staff.routes")(app);

app.listen(PORT,()=>
{
    console.log("server is listening on port no 3000");
});