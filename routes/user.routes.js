module.exports = app => {
    const user = require("../controllers/user.controller");
    app.post("/newuser", user.create);
    app.get("/:phoneoremail&:password", user.findOne);
    
};