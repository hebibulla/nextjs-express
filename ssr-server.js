const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const handlebars = require('handlebars');

const NodeMailer = require("./server_src/mailer");

const path = require("path");
const fs = require('fs');

var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          callback(err);
          throw err;
      }
      else {
          callback(null, html);
      }
  });
};

readHTMLFile(__dirname + '/server_src/mail/template.html','utf-8', (err, data) => {
  // if(err) throw err;
  console.log(data)
  return data;
  console.log(html_data);
  var template = handlebars.compile(html_data);
  var replacements = {
       username: "John Doe"
  };
  var htmlToSend = template(replacements);
  
  console.log(htmlToSend)
});



app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.get("/post/:id", (req, res) => {
      return app.render(req, res, "/post", { id: req.params.id });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.post("/contact-email", (req, res) => {
      console.log(req.body);
      const sendMail = new NodeMailer(
        process.env.MAIL_HOST,
        process.env.MAIL_PORT,
        process.env.MAIL_USERNAME,
        process.env.MAIL_PASSWORD
      );

       const html_data =  fs.readFile(__dirname+'/server_src/mail/template.html','utf-8', (err, data) => {
          if(err) throw err;
          console.log(data)
        });

        var template = handlebars.compile(html_data);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);

        console.log(htmlToSend)
      sendMail
        .send({
          from: "myCompany@gmail.com",
          to: req.body.email,
          subject: "Hello ✔",
          text: req.body.subject,
          html: htmlToSend,
        })
        .then(() => {
          res.send("yes");
        })
        .catch((Error) => {
          res.status(500).send(Error);
        });
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
