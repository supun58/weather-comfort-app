### Weather Comfort Index Dashboard

A full-stack web application that collects weather data from 10 multiple cities from cities.json and calculates a Comfort Index to estimate how comfortable the weather conditions are for humans.The system fetches weather data from the OpenWeather API, processes it in the backend, and displays a mobile-responsive dashboard where users can view weather conditions and comfort scores for different cities.

The application also includes authentication, caching, and a debug endpoint to demonstrate backend engineering practices.

## Project Overview

The goal of this project is not just to display weather data, but to transform raw weather information into a meaningful metric called the Comfort Index. Weather factors such as temperature, humidity, wind speed, and cloud coverage affect how comfortable a person feels outdoors. Therefore, the backend processes these variables and calculates a score between 0 and 100, where higher values indicate more comfortable weather.
This helped to understand how backend processing, caching strategies, and authentication systems work together in a real full-stack application.

# Tech Stack
-Frontend
-React
-Vite
-Tailwind CSS
-shadcn/ui

# Backend
-Node.js
-Express.js
-Axios

# Authentication
-Auth0

# Weather Data
-OpenWeather API


## Setup Instructions

# Clone the Repository
-git clone https://github.com/supun58/weather-comfort-app.git
-cd weather-comfort-app

# Backend Setup
Navigate to the backend folder:

-cd backend
-npm install

# Create a .env file:
-OPENWEATHER_API_KEY=your_api_key
-PORT=5000

# Start the backend server:
-npm run dev

Backend will run on:
-http://localhost:5000

# Frontend Setup
Navigate to the frontend folder:

-cd frontend
-npm install

# Create a .env file:
-VITE_AUTH0_DOMAIN=your_auth0_domain
-VITE_AUTH0_CLIENT_ID=your_client_id

# Run the development server:
-npm run dev

Frontend will run on:
-http://localhost:5173

## Authentication
Authentication is implemented using Auth0. Only authenticated users are allowed to access the Comfort Index dashboard.
The login flow is:
User Login → Auth0 Authentication → Dashboard Access
Public signups are disabled and only whitelisted users can log into the system.

# Test user provided for the assignment:
-Email: careers@fidenz.com
-Password: Pass#fidenz

This ensures controlled access to the application.



### Comfort Index Formula
The Comfort Index is calculated using four weather variables: Temperature, Humidity, Wind Speed, Cloud Coverage.
Each factor affects how comfortable people feel outdoors.

The formula used in the system is:

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

Comfort Index = (Temperature Score × 0.4) + (Humidity Score × 0.3) + (Wind Score × 0.2) + (Cloud Score × 0.1)

The final score is normalized between 0 and 100. Higher scores represent more comfortable conditions.

## Reasoning Behind Variable Weights
While designing the Comfort Index, I considered how each weather factor influences human comfort.

-Temperature – Weight 40%
Temperature has the largest impact on human comfort, especially in tropical countries like Sri Lanka. Extreme temperatures make outdoor conditions uncomfortable quickly. Therefore temperature received the highest weight.

-Humidity – Weight 30%
Humidity strongly affects perceived temperature. For example, high humidity makes weather feel hotter than the actual temperature, which is common in coastal climates. Because of this effect, humidity was given the second highest weight.

-Wind Speed – Weight 20%
Wind helps regulate temperature perception by providing cooling effects. However extremely strong wind may reduce comfort. So wind was given a moderate weight.

-Cloud Coverage – Weight 10%
Cloud coverage affects sunlight intensity and temperature perception. While it contributes to comfort, it is less influential than the other factors. Therefore it received the lowest weight.

## Trade-offs Considered
During development, several trade-offs were considered.

# Simplicity vs Accuracy
A very complex model could have been used (for example machine learning models). However the goal of this assignment is clarity and explainability. Therefore a simple weighted formula was chosen so that the logic is easy to understand and justify.

# Real-time Data vs Performance
Fetching weather data from the API every request would ensure real-time accuracy.

However it would also:
-increase API usage
-slow down responses

Therefore caching was introduced to improve performance.

# Custom Authentication vs External Authentication
Authentication could have been implemented manually using JWT and user databases.

However using Auth0 provides:
-better security
-faster implementation
-industry-standard authentication flow

## Cache Design Explanation
The backend implements a 5-minute cache for weather data. When the /weather endpoint is called:

If cache exists AND not expired → return cached data
Else → fetch new data from OpenWeather API

-Cache duration: 5 minutes

# Benefits:
-reduces API calls
-improves response speed
-prevents unnecessary network requests

# The system also includes a debug endpoint: /debug

This endpoint returns:
-Cache Status: HIT or MISS
-Last Fetch Time

This helps verify whether caching is working correctly.

## UI Features
The dashboard UI includes:

-modern card-based weather display
-mobile responsive layout
-dark mode support
-weather icons
-comfort score visualization
-The interface was built using Tailwind CSS and shadcn/ui components to create a clean and modern design.

## Known Limitations

Although the system works as expected, there are some limitations.

# Limited Cities
-Currently the system uses a fixed list of cities defined in the backend (with newly added two cities). Future versions could allow dynamic city search.

# Simplified Comfort Model
-The Comfort Index formula is a simplified model.

Other environmental factors such as:
-UV index
-air pressure
-pollution
could improve the accuracy of the score.

# External API Dependency
The application depends on the OpenWeather API. If the API is unavailable, weather data cannot be fetched.

## MFA Implementation Note
One of the assignment requirements was to implement Multi-Factor Authentication (MFA) using email verification codes.
While configuring authentication using Auth0, I initially enabled Email + Authenticator App MFA. During testing I observed that when both factors are enabled, Auth0 prioritizes the Authenticator App OTP, and the system consistently prompts for authenticator based codes instead of sending verification codes via email.
I also explored implementing a custom email OTP verification using Auth0 Actions (Post-Login triggers). Although this approach is technically possible, it requires integrating an external email service (such as SMTP or an email API), which introduces additional infrastructure outside the scope of this assignment.

Therefore, the current implementation includes:
-Authentication via Auth0 hosted login
-Public signups disabled
-Access restricted to whitelisted users
-MFA supported using Authenticator App OTP, which is the default secure MFA option in Auth0

Although email-based OTP MFA was not fully implemented due to this limitation, the system still demonstrates a secure authentication flow and proper access control. Email-based OTP MFA could be added in the future using Auth0 Actions combined with an email delivery service.


## Personal Reflection
Working on this assignment was a valuable learning experience for me. It gave me the opportunity to practice full-stack development, API integration, caching strategies, and authentication systems in a single project. At the beginning, integrating authentication and caching seemed challenging, but gradually implementing each component helped me understand how real-world applications are structured. I really enjoyed building the dashboard UI and seeing the weather data transform into a meaningful Comfort Index score. This project helped me strengthen both my backend thinking and frontend design skills, and I hope it reflects my enthusiasm for software engineering.