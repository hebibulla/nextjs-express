
// express
const express = require("express");
const server = express();
const router = require('./routers/web')


// next js
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


// lib
const NodeMailer = require("./server_src/MailInit");
const HtmlMailTemplate = require("./server_src/HtmlMailRender");
const bodyParser = require("body-parser");


// middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router)

app
  .prepare()
  .then(() => {
    

    server.get("*", (req, res) => {
      return handle(req, res);
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
