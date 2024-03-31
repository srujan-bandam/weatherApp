function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'e28c214d330f43ed8e91b4f26a7039ab';
    const apiKey2 ='3b7d001abd62816c23d1af9a1ded07f4'
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                throw new Error('City not found. Please try again.');
            }
            const location = data.results[0].geometry;
            return location;
        })
        .then(location => {
            const latitude = location.lat;
            const longitude = location.lng;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=metric`;

            return fetch(weatherUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            weatherInfo.innerHTML = `
                <p>Weather: ${description}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
            `;
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.textContent = error.message;
            console.error('Error fetching weather data:', error);
        });
}
