const express = require("express");
const https = require("https");
const app = express();

app.get("/", (req, res) => {
    const location = "Gliwice";
    const keyId= process.env.key;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + keyId + "&units=metric";
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherObject = JSON.parse(data);
            const temperature = weatherObject.main.temp;
            const description = weatherObject.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherObject.weather[0].icon + "@2x.png";
            res.write("<h1>Temperature in Gliwice: " + temperature + " degree Celsius</h1>");
            res.write("<p>Weather is currently: " + description + "</p>");
            res.write("<img src='" + icon + "'>");
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});