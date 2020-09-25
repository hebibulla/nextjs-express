"use strict";
const nodemailer = require("nodemailer");

module.exports = class SendMail {

  constructor(
   host,
   port,
   userName,
   password
  ) {
    // this.host = "smtp.mailtrap.io";
    // this.port = 2525;
    // this.userName = "b44524dff91b64";
    // this.password = "15e70e916ce39b";
    this.host = host;
    this.port = port;
    this.userName = userName;
    this.password = password;
  }
  // async..await is not allowed in global scope, must use a wrapper
  async send(_info) {
    // Generate test SMTP service account from ethereal.email
    var transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.userName,
        pass: this.password,
      },
    }); 
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: _info.from, // sender address
      to: _info.to, // list of receivers
      subject: _info.subject, // Subject line
      text: _info.text, // plain text body
      html: _info.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
