const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const mysql = require('mysql');

const NodeMailer = require("./server_src/MailInit");
const HtmlMailTemplate = require("./server_src/HtmlMailRender");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express"
})

db.connect((err) => {
  if(err) throw err;
  console.log("my sql connected")
})

app
  .prepare()
  .then(() => {
    
    const server = express();

    server.use(function timeLog  (req, res, next) {
      console.log("Time: " + Date.now());
      next();
    });

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

      // html template instans
      const htmlTemplate = new HtmlMailTemplate().get();

      // send mail
      sendMail
        .send({
          from: "myCompany@gmail.com",
          to: req.body.email,
          subject: "お問い合わせありがとうございます！",
          text: req.body.subject,
          html: htmlTemplate,
        })
        .then(() => {
          res.send("success");
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
