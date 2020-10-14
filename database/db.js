
const { Client } = require('pg'); 


// db connection 
const dbConnect_conf = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
}

const psql = new Client(dbConnect_conf);

psql.connect(
  err => {
    if(err){
      console.log(err);
    }else{
      console.log("Database is connected >>>>>>>");
    }
  }
);