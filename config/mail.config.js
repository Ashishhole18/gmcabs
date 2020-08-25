var nodemailer=require('nodemailer');



var transporter=nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:'developer.esenceweb@gmail.com',
        pass:'developer$$@@##121'
    }
});
module.exports = transporter; 