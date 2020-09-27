const fs = require("fs");
const handlebars = require('handlebars');

module.exports = class HtmlMailRender{
    get(){
        const html_data = fs.readFileSync(
            __dirname + "/mail/template.html",
            "utf-8",
            (err, data) => {
              if (err) throw err;
            }
          );
          var template = handlebars.compile(html_data);
          var replacements = {
            username: "John Doe",
          };
          var htmlToSend = template(replacements);
  
          return htmlToSend;
    }
}
