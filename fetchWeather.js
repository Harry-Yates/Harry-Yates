const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const getWeatherMessage = require("./weatherDescriptions.js");
const cities = require("./cities.js");

/// TRAVEL CONFIGURATION
const travelConfig = require("./travel-config.json");

const travelPeriods = travelConfig.map(trip => {
  if (!cities[trip.country] || !cities[trip.country][trip.city]) {
    console.warn(`Warning: City not found for trip to ${trip.city}, ${trip.country}`);
    return null;
  }
  
  return {
    start: new Date(trip.start),
    end: new Date(trip.end),
    destination: cities[trip.country][trip.city],
    showHomeAsComparison: trip.showHomeAsComparison
  };
}).filter(Boolean);

// Check if currently traveling
const today = new Date();
const currentTrip = travelPeriods.find(trip =>
  today >= trip.start && today <= trip.end
);

const isTraveling = !!currentTrip;
const homeCity = cities.Sweden.Stockholm;
const defaultComparisonCity = cities.United_Kingdom.London;

// Set cities based on travel status
const currentCity = isTraveling ? currentTrip.destination : homeCity;
const secondaryCity = isTraveling
  ? (currentTrip.showHomeAsComparison ? homeCity : defaultComparisonCity)
  : defaultComparisonCity;


const fetchCityWeather = async (city) => {
  const apiKey = process.env.OPEN_WEATHER;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather for ${city.name}`);
  }
  return response.json();
};

const fetchWeather = async () => {
  console.log("Fetching weather data...");

  try {
    // Fetch primary city weather
    const data = await fetchCityWeather(currentCity);

    // Fetch secondary city weather if configured
    let secondaryData = null;
    if (secondaryCity) {
      try {
        secondaryData = await fetchCityWeather(secondaryCity);
      } catch (e) {
        console.error(`Failed to fetch secondary city: ${e.message}`);
      }
    }

    // Extract comprehensive weather data
    const current = data.current;
    const daily = data.daily[0]; // Today's forecast
    
    // Current conditions
    const temperature = Math.round(current.temp);
    const feelsLike = Math.round(current.feels_like);
    const weatherCondition = current.weather[0].description;
    const humidity = current.humidity;
    const windSpeed = Math.round(current.wind_speed * 3.6); // Convert m/s to km/h
    const windDeg = current.wind_deg;
    const pressure = current.pressure;
    const uvi = current.uvi;
    const visibility = current.visibility;
    const clouds = current.clouds;

    // Time-related data
    const timezone = data.timezone;
    const timezoneOffset = data.timezone_offset;
    const sunrise = current.sunrise;
    const sunset = current.sunset;
    const currentTime = current.dt;
    
    // Daily forecast data
    const tempMin = Math.round(daily.temp.min);
    const tempMax = Math.round(daily.temp.max);
    const dailySummary = daily.summary || "";
    const precipProbability = Math.round(daily.pop * 100);

    // Tomorrow's forecast
    const tomorrow = data.daily[1];
    const tomorrowTemp = Math.round(tomorrow.temp.day);
    const tomorrowCondition = tomorrow.weather[0].main;

    // Weekly data for graph
    const weeklyTemps = data.daily.slice(0, 7).map(day => Math.round(day.temp.day));
    
    // Wind direction conversion
    const getWindDirection = (deg) => {
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                         'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      return directions[Math.round(deg / 22.5) % 16];
    };
    
    // Process secondary city data if available
    let secondaryCityData = null;
    if (secondaryData) {
      secondaryCityData = {
        name: secondaryCity.name,
        temp: Math.round(secondaryData.current.temp),
        condition: secondaryData.current.weather[0].main
      };
    }

    // Build comprehensive weather message
    const weatherMessage = getWeatherMessage(
      temperature,
      feelsLike,
      weatherCondition,
      currentCity.name,
      {
        humidity,
        windSpeed,
        windDirection: getWindDirection(windDeg),
        pressure,
        uvi,
        visibility,
        clouds,
        tempMin,
        tempMax,
        dailySummary,
        precipProbability,
        timezone,
        timezoneOffset,
        sunrise,
        sunset,
        currentTime,
        tomorrowTemp,
        tomorrowCondition,
        weeklyTemps,
        secondaryCity: secondaryCityData,
        isTraveling
      }
    );

    return weatherMessage;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return `Based in ${currentCity.name}. Weather data temporarily unavailable.`;
  }
};

const getIntroLine = () => {
  const base = "Based in Stockholm";
  const website = "[harryyates.com](https://harryyates.com)";

  if (isTraveling && currentTrip) {
    // Get country display name from config (replace underscores with spaces)
    const tripConfig = travelConfig.find(trip =>
      new Date(trip.start) <= today && new Date(trip.end) >= today
    );
    const countryDisplay = tripConfig ? tripConfig.country.replace(/_/g, ' ') : currentCity.name;
    return `${base} · Currently in ${countryDisplay} · ${website}`;
  }

  return `${base} · ${website}`;
};

const updateReadme = async (weatherData) => {
  try {
    const readmePath = path.join(__dirname, "README.md");
    let readmeContent = fs.readFileSync(readmePath, "utf8");

    console.log(readmeContent);

    // Update intro section
    const introStartMarker = "<!-- INTRO_START -->";
    const introEndMarker = "<!-- INTRO_END -->";
    const introStartIndex = readmeContent.indexOf(introStartMarker) + introStartMarker.length;
    const introEndIndex = readmeContent.indexOf(introEndMarker);

    if (introStartIndex > 0 && introEndIndex > 0 && introStartIndex < introEndIndex) {
      const beforeIntro = readmeContent.substring(0, introStartIndex);
      const afterIntro = readmeContent.substring(introEndIndex);
      readmeContent = beforeIntro + "\n" + getIntroLine() + "\n" + afterIntro;
    }

    // Update weather section
    const startMarker = "<!-- WEATHER_START -->";
    const endMarker = "<!-- WEATHER_END -->";
    const startIndex = readmeContent.indexOf(startMarker) + startMarker.length;
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex < 0 || endIndex < 0 || startIndex >= endIndex) {
      throw new Error("Could not find placeholders in README.md");
    }

    const beforeWeather = readmeContent.substring(0, startIndex);
    const afterWeather = readmeContent.substring(endIndex);
    readmeContent = beforeWeather + "\n" + weatherData + "\n" + afterWeather;

    fs.writeFileSync(readmePath, readmeContent, "utf8");
  } catch (error) {
    console.error("An error occurred in updateReadme:", error);
    throw error;
  }
};

fetchWeather()
  .then(updateReadme)
  .catch((error) => console.error("An error occurred:", error));
