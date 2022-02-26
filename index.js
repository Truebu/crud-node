const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./route/userRoute.js");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", userRoute);

app.get('/', (req, res)=>{
    res.json({message : "Test"});
});

app.listen(3000, ()=>{
    console.log("Server is listen in port 3000");
});