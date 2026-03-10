const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Weather API Running");
});

//get weather data for a specific location
app.get("/weather", (req,res)=> {
    res.send("Weather data coming soon...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});