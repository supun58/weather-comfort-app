import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

//import cities data
import cities from "./cities.json" with { type: "json" };
import calculateComfortScore from "./ComfortScore.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//cache raw weather data for 5 minutes
let cachedData = null;
let lastFetchTime = 0;

app.get("/weather", async (req, res) => {
  const now = Date.now();

  if (cachedData && now - lastFetchTime < 5 * 60 * 1000) {
    console.log("Serving cached weather data");
    return res.json(cachedData);
  }
  console.log("Fetching new weather data");

  //fetch new data and update cache
  const apiKey = process.env.API_KEY;
  const weatherData = [];

  const cityList = cities.List;  
  
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
    }
      catch (error) {
      console.error(`Error fetching weather data for ${city.CityName}:`, error.message);
    }
  }
  cachedData = weatherData;
  lastFetchTime = now;
  res.json(weatherData);
}
);

//debug endpoint to show cached status(hit/miss) and last fetch time
app.get("/debug", (req, res) => {
  const now = Date.now();
  const cacheStatus = cachedData && now - lastFetchTime < 5 * 60 * 1000 ? "HIT" : "MISS";
  res.json({
    cacheStatus: cacheStatus,
    lastFetchTime: new Date(lastFetchTime).toLocaleString()
  });
}
);


//verify otp
app.post("/verify-otp", async (req,res)=>{

  const {code} = req.body
  const storedOTP = "123456"

  if(code == storedOTP){
    res.status(200).send("verified")
  }else{
    res.status(401).send("invalid")
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});