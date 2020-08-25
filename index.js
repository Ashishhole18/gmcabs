const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
// parse requests of content-type: application/json
app.use(bodyParser.json());
require("./routes/user.routes")(app);









app.listen(3000,()=>
{
    console.log("server is listening on port no 3000");
});