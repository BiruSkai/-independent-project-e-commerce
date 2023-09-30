const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT_SERVER;
const session = require('express-session');
const store = session.MemoryStore();
const morgan= require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {maxAge:1000*60*60, sameSite:'none'},
        store
}))
app.use(morgan('tiny'));
app.use(helmet());
app.use(cookieParser);

app.get("/", (req, res) => {
        res.send("Hello Dear");
});


// Starting server 
app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
})