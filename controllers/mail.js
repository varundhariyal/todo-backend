"use strict";
const nodemailer = require("nodemailer");

const response = require('../libs/response')


// async..await is not allowed in global scope, must use a wrapper
let sendMail = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nirvanarocks2310@gmail.com',
            pass: 'nirvana2310'
        }
    });
    const mailOptions = {
        from: 'nirvanarocks2310@gmail.com', // sender address
        to: `${req.body.Email}`, // list of receivers
        subject: 'Password Reset', // Subject line
        html: '<h1>Forgot Your Password?</h1><br><p>Sometimes we forget our passwords.</p><br><p>LiveTo-Do help you to reset your password and create a new one!</p><br><p>Click<a href="http://localhost:4200/setpassword"> here </a>To Reset Your Password</p><br><p>Cheers,</p><br><p><b>Copyright © 2019 Varun Dhariyal</b></p>' // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        let apiResponse="";
        if (err){
            console.log(err)
            apiResponse = response.generate(true, 'error while sending emails- ' + err, 500, null);
        }
        else{
            console.log(info);
            apiResponse = response.generate(false, 'Mail sent successfully!', 200, null);
        }
        res.send(apiResponse);
    });
}
module.exports = {
    sendMail: sendMail
}