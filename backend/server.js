import express from "express";
import cors from "cors";
import axios from "axios";

//import cities data
import cities from "./cities.json" with { type: "json" };
import calculateComfortScore from "./ComfortScore.js";

const app = express();

app.use(cors());
app.use(express.json());

//fetch weather data 
app.get("/weather", async (req, res) => {
  // const cities = require("./cities.json");
  const apiKey = "9f6584ef7c41eee685fa2762622462f6";
  const weatherData = [];

  const cityList = cities.List;  
  
  // Loop through each city in the List
  for (const city of cityList) {    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.CityName}&appid=${apiKey}`
      );
      const comfortScore = calculateComfortScore(response.data.main.temp, response.data.main.humidity, response.data.wind.speed,response.data.clouds.all);

      weatherData.push({
        cityCode: city.CityCode,
        cityName: city.CityName,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        comfortScore: comfortScore
      });
    } catch (error) {
      console.error(`Error fetching weather data for ${city.CityName}:`, error.message);
    }
  }
  
  res.json(weatherData);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});