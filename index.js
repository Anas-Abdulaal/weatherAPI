require("dotenv").config();
const express = require("express");
const app = express();
const Datastore = require("nedb");
const database = new Datastore("database.db");
database.loadDatabase();
const port = process.env.PORT || 3000;
app.listen(port, () =>{ console.log(`listening at ${port}`) });
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

app.get("/api", (req, res) =>{
    database.find({}, (err, docs) =>{
        res.json(docs)
    })
})

app.post("/postedData", (req, res) =>{
    database.insert(req.body)
    // console.log(req.body);
    res.json({
        status: "success",
        data: req.body,
    })
})

app.get("/weather/:latLng", async (req, res) =>{
    const latLng = req.params.latLng.split(",");
    console.log(latLng);
    const lat = latLng[0];
    const lng = latLng[1];
    console.log(lat, lng);
    const theURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${lat},${lng}`;
    const get = await fetch(theURL);
    const getRes = await get.json();
    res.json(getRes);
});