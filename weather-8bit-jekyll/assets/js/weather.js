const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const apiUrl = `https://api.open-meteo.com/v1/forecast?&timezone=Australia/Melbourne&latitude=-37.87&longitude=145.28&current=temperature_2m,precipitation_probability,weather_code`;
const weatherCodesGistUrl = 'https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json';
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds

let weatherCodesMap = {};
let weatherUpdateTimer;

// Fetch weather codes from GitHub Gist
async function fetchWeatherCodes() {
    try {
        const response = await fetch(weatherCodesGistUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather codes');
        }
        weatherCodesMap = await response.json();
        console.log('Weather codes loaded:', weatherCodesMap);
        
        // Now that we have the weather codes, we can fetch the current weather
        fetchWeather();
    } catch (error) {
        console.error('Error fetching weather codes:', error);
        document.getElementById('weather-description').textContent = 'Error loading weather codes';
    }
}

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Update weather information on the page
        const weatherCode = data.current.weather_code;
        const temperature = data.current.temperature_2m;
        const precipProb = data.current.precipitation_probability;
        
        // Update DOM elements
        document.getElementById('weather-temperature').textContent = `Temperature: ${temperature}°C`;
        
        // Add precipitation probability information
        let precipElement = document.getElementById('weather-precip');
        if (!precipElement) {
            precipElement = document.createElement('p');
            precipElement.id = 'weather-precip';
            
            // Insert it after temperature
            const tempElement = document.getElementById('weather-temperature');
            if (tempElement) {
                tempElement.after(precipElement);
            } else {
                // Fallback: add to weather info container
                const weatherContainer = document.getElementById('weather-info');
                if (weatherContainer) {
                    weatherContainer.appendChild(precipElement);
                }
            }
        }
        
        // Display precipitation probability
        precipElement.textContent = `Precipitation: ${precipProb}%`;
        
        // Get weather description from our codes map
        const weatherInfo = weatherCodesMap[weatherCode] || {
            "night": {
                "description": "Unknown weather condition",
                "image": "https://thumbs.dreamstime.com/b/pixel-question-mark-icon-clipart-image-isolated-white-background-210308462.jpg"
            }
        };
        
        document.getElementById('weather-description').textContent = weatherInfo.night.description + ' in Boronia';
        
        // Update the background animation based on weather code
        updateBackground(weatherCode, weatherInfo);
        
        // Update last refresh time display
        updateLastRefreshTime();
        
        console.log('Weather updated:', { 
            weatherCode, 
            description: weatherInfo.night.description, 
            temperature,
            precipitationProbability: precipProb
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('weather-description').textContent = 'Error loading weather data';
    }
}

function updateBackground(weatherCode, weatherInfo) {
    const body = document.body;
    
    // Add appropriate class based on weather code
    let weatherClass = weatherInfo.night.description || 'default';
       
    // Create or update weather animation container
    let animContainer = document.getElementById('weather-animation');
    if (!animContainer) {
        animContainer = document.createElement('div');
        animContainer.id = 'weather-animation';
        document.body.appendChild(animContainer);
    }
    
    // Clear existing animation elements
    animContainer.innerHTML = '';
    
    // Add animation elements based on weather class
    const weatherLower = weatherClass.toLowerCase();
    
    if (weatherLower.includes('rain')) {
        createRaindrops(animContainer, 50);
    }
    
    if (weatherLower.includes('snow')) {
        createSnowflakes(animContainer, 30);
    }
    
    if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
        createRaindrops(animContainer, 30);
        createLightning(animContainer);
    }
    
    if (weatherLower.includes('cloud')) {
        createClouds(animContainer, 3);
    }
    
    if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
        createSunOrMoon(animContainer);
    }
    
    if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
        createFog(animContainer);
    }
    
    if (weatherLower.includes('drizzle')) {
        createRaindrops(animContainer, 20);
    }
    
    console.log(`Applied weather class: ${weatherClass} for code: ${weatherCode}`);
}

function updateLastRefreshTime() {
    // const now = new Date();
    // const timeString = now.toLocaleTimeString();
    
    // // Create or update refresh time display
    // let refreshTimeElement = document.getElementById('last-refresh-time');
    // if (!refreshTimeElement) {
    //     refreshTimeElement = document.createElement('p');
    //     refreshTimeElement.id = 'last-refresh-time';
        
    //     // Insert it into the weather info container
    //     const weatherContainer = document.getElementById('weather-info');
    //     if (weatherContainer) {
    //         weatherContainer.appendChild(refreshTimeElement);
    //     }
    // }
    
    // refreshTimeElement.textContent = `Last updated: ${timeString}`;
    
    // // Show next update time
    // const nextUpdate = new Date(now.getTime() + REFRESH_INTERVAL);
    // const nextUpdateElement = document.getElementById('next-update-time');
    // if (!nextUpdateElement) {
    //     const nextUpdateEl = document.createElement('p');
    //     nextUpdateEl.id = 'next-update-time';
    //     nextUpdateEl.classList.add('next-update');
        
    //     // Insert after the last refresh time
    //     if (refreshTimeElement) {
    //         refreshTimeElement.after(nextUpdateEl);
    //     }
    // }
    
    // document.getElementById('next-update-time').textContent = `Next update: ${nextUpdate.toLocaleTimeString()}`;
}

// Setup periodic refresh
function setupWeatherRefresh() {
    // Clear any existing timer
    if (weatherUpdateTimer) {
        clearInterval(weatherUpdateTimer);
    }
    
    // Set new timer for refreshing weather data
    weatherUpdateTimer = setInterval(() => {
        console.log('Refreshing weather data...');
        fetchWeather();
    }, REFRESH_INTERVAL);
    
    // Display countdown to next refresh
    setupRefreshCountdown();
}

// Optional: Add a countdown display for next refresh
function setupRefreshCountdown() {
    // Create countdown element if it doesn't exist
    let countdownElement = document.getElementById('refresh-countdown');
    if (!countdownElement) {
        countdownElement = document.createElement('span');
        countdownElement.id = 'refresh-countdown';
        countdownElement.classList.add('countdown');
        
        // Find next update element to append countdown
        const nextUpdateElement = document.getElementById('next-update-time');
        if (nextUpdateElement) {
            nextUpdateElement.appendChild(document.createTextNode(' ('));
            nextUpdateElement.appendChild(countdownElement);
            nextUpdateElement.appendChild(document.createTextNode(')'));
        }
    }
    
    // Update the countdown every second
    let secondsLeft = REFRESH_INTERVAL / 1000;
    
    const updateCountdown = () => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
            secondsLeft = REFRESH_INTERVAL / 1000;
        }
        
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = Math.floor(secondsLeft % 60);
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Initial update
    updateCountdown();
    
    // Set interval for countdown
    setInterval(updateCountdown, 1000);
}

function createRaindrops(container, count) {
    for (let i = 0; i < count; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${0.5 + Math.random() * 1}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(raindrop);
    }
}

function createSnowflakes(container, count) {
    for (let i = 0; i < count; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${3 + Math.random() * 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(snowflake);
    }
}

function createLightning(container) {
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    container.appendChild(lightning);
}

function createClouds(container, count) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = `${10 + i * 15}%`;
        cloud.style.left = `${Math.random() * 80}%`;
        cloud.style.animationDuration = `${20 + Math.random() * 30}s`;
        container.appendChild(cloud);
    }
}

function createSunOrMoon(container) {
    // Create celestial body container for better positioning
    const celestialContainer = document.createElement('div');
    celestialContainer.className = 'celestial-container';
    
    // Determine if it's day or night based on current hour
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    
    // Create the main celestial body (sun or moon)
    const celestial = document.createElement('div');
    celestial.className = isDay ? 'sun' : 'moon';
    
    // Add rays around the sun for a more dynamic 8-bit look
    if (isDay) {
        // Create pixel rays for the sun in 8-bit style
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.className = 'sun-ray';
            
            // Position rays in a circular pattern
            const angle = (i * 45) * (Math.PI / 180); // 45 degrees apart
            const rayDistance = 40; // Distance from sun center
            
            // Calculate position using trigonometry
            const x = Math.cos(angle) * rayDistance - 58;
            const y = Math.sin(angle) * rayDistance + 5;
            
            // Apply the position and rotation
            ray.style.transformOrigin = 'left center';
            ray.style.transform = `translate(${x}px, ${y}px) rotate(${i * 45}deg)`;
            ray.style.width = '30px'; // Make rays longer
            ray.style.height = '8px'; // And thicker
            
            celestialContainer.appendChild(ray);
        }
    } else {
        // Create stars for night sky
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${1 + Math.random() * 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(star); // Stars go directly in the main container
        }
        
        // Add crater details to moon for 8-bit style
        for (let i = 0; i < 3; i++) {
            const crater = document.createElement('div');
            crater.className = 'moon-crater';
            crater.style.top = `${20 + Math.random() * 60}%`;
            crater.style.left = `${20 + Math.random() * 60}%`;
            crater.style.width = `${5 + Math.random() * 10}px`;
            crater.style.height = `${5 + Math.random() * 10}px`;
            celestial.appendChild(crater);
        }
    }
    
    // Add celestial body to its container
    celestialContainer.appendChild(celestial);
    container.appendChild(celestialContainer);
}

function createFog(container) {
    for (let i = 0; i < 3; i++) {
        const fogLayer = document.createElement('div');
        fogLayer.className = 'fog-layer';
        fogLayer.style.top = `${20 + i * 20}%`;
        fogLayer.style.animationDuration = `${15 + i * 5}s`;
        container.appendChild(fogLayer);
    }
}

// Initialize weather data when page loads
document.addEventListener('DOMContentLoaded', () => {
    // First, load weather codes and fetch initial weather data
    fetchWeatherCodes();
    
    // Then set up the periodic refresh
    setupWeatherRefresh();
});