function calculateComfortScore(temperature, humidity, windSpeed, clouds ) { 
    const tempC = temperature - 273.15;
    
    //Temperature component (based on ASHRAE 20-27°C range)
    let tempScore = 0;
    if (tempC >= 20 && tempC <= 27) {
        tempScore = 100; 
    } else if (tempC < 20) {
        tempScore = 100 - (20 - tempC) * 5; 
    } else {
        tempScore = 100 - (tempC - 27) * 5; 
    }

    //Humidity component (based on 30-60% range)
    let humidityScore = 0;
    if (humidity >= 30 && humidity <= 60) {
        humidityScore = 100;
    } else if (humidity < 30) {
        humidityScore = 100 - (30 - humidity) * 3; 
    }
    else {
        humidityScore = 100 - (humidity - 60) * 3;
    }

    //Wind speed component (based on 0-5 m/s range)
    let windScore = 0;
    if (windSpeed >= 0 && windSpeed <= 5) {
        windScore = 100;
    } else if (windSpeed < 0) {
        windScore = 100 - (0 - windSpeed) * 20;
    } else {
        windScore = 100 - (windSpeed - 5) * 20;
    }

    //Cloudiness component (based on 0-50% range)
    let cloudScore = 0;
    if (clouds >= 0 && clouds <= 50) {
        cloudScore = 100;
    } else if (clouds < 0) {
        cloudScore = 100 - (0 - clouds) * 2;
    } else {
        cloudScore = 100 - (clouds - 50) * 2;
    }


    //Weights
    const weights = {
        temperature: 0.4,  //Most important
        humidity: 0.3,      //Second most important
        wind: 0.2,          //Medium importance
        clouds: 0.1         //Least important
    };
    
    const finalScore = (tempScore * weights.temperature) +
                      (humidityScore * weights.humidity) +
                      (windScore * weights.wind) +
                      (cloudScore * weights.clouds);

    return Math.max(0, Math.min(100, Math.round(finalScore)));
}

export default calculateComfortScore;