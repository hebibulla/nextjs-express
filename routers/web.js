
const Express = require('express');
const router = Express.Router();

import  EmailController  from '../controller';

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nexApp = next({ dev });
const handle = nexApp.getRequestHandler();



router.use(function timeLog  (req, res, next) {
 console.log("Time: " + Date.now());
 next();
});

router.get("/post/:id", (req, res) => {
 return nexApp.render(req, res, "/post", { id: req.params.id });
});



// router.post("/contact-email", (req, res) => {
//    console.log(req.body);

//    const sendMail = new NodeMailer(
//      process.env.MAIL_HOST,
//      process.env.MAIL_PORT,
//      process.env.MAIL_USERNAME,
//      process.env.MAIL_PASSWORD 
//    );

//    // html template instans
//    const htmlTemplate = new HtmlMailTemplate().get();

//    // send mail
//    sendMail
//      .send({
//        from: "myCompany@gmail.com",
//        to: req.body.email,
//        subject: "お問い合わせありがとうございます！",
//        text: req.body.subject,
//        html: htmlTemplate,
//      })
//      .then(() => {
//        res.send("success");
//      })
//      .catch((Error) => {
//        res.status(500).send(Error);
//      });
 // });

 module.exports = router;