const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/order.route.js")(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to order application" });
})

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
})

// set port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
