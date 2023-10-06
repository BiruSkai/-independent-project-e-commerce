const Pool = require("pg").Pool;
const dotenv = require("dotenv").config({path:"../.env"});

// Using Client(static) to connect postgres
// client.connect();
// client.query(`SELECT * FROM user_data`, (err, res)=>{
//         if(err) {
//                 console.log(err.message);
//         } else {
//                 console.log(res.rows);
//         }
//         client.end;
// });

//Collect data form .env for access
const pool = new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT_POSTGRES
});

module.exports = pool;

