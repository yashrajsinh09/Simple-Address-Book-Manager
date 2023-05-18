const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const route = require("./route/contactRoute.js");
require("dotenv").config();
const app = express();
const PORT = 3000 || process.env.PORT;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", route);

app.listen(PORT, console.log(`app running on ${PORT}`));
