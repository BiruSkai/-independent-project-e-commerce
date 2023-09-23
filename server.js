const express = require("express");
const app = express();

// Establishing cors middleware
const cors = require("cors");
app.use(cors());

// Parse application/json 
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
        res.send("Hello");
})


// Starting server 
app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
})