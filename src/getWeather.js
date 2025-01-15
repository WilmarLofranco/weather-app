// getWeather.js

// define dom elements
const weatherImg = document.querySelector('#weather-img');
let description = document.querySelector('#weather-description');
const getWeatherBtn = document.querySelector('#get-weather');

// define global variable
let weatherDescription = "";

// function to get weather
async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SYP8MPR5YWAV8CJA6KEXN44KD`,
        {mode: 'cors'});
        const cityData = await response.json();
        weatherDescription = cityData.days[0].conditions;

        // write weather description to dom
        description.textContent = weatherDescription;

        // invoke the gif getting
        getGif(weatherDescription);

        // error handling
    } catch (error) {
        console.error('Error fetching weather data:', error)
    }
}

// function to get gif
async function getGif(weatherDescription) {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=IE08ZhlYD2Sbzo7fEfuCZINXqmA3c9ib&s=${weatherDescription}`, 
        {mode: 'cors'});
        const gifData = await response.json();

        // put gif to dom
        weatherImg.src = gifData.data.images.original.url;
  }

// event listeners
getWeatherBtn.addEventListener("click", () => {
    const city = document.querySelector("#city").value.trim();
    weatherImg.src = "https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif";
    if (city) {
        getWeather(city);

    } else {
        console.error("Please enter a city name.");
    }
});


export { weatherImg, getWeather, getGif }