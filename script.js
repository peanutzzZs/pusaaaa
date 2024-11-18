function getWeather() {
    const apiKey = '691c94df41016cdc19f21018e3fdf1d8';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });     

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); 
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8);  
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); 
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}


function loadProducts() {
    const productsContainer = document.getElementById('products-list');
    
    productsContainer.innerHTML = '';

 
    const products = [
        { name: 'SPF 30 Sunscreen', description: 'Protect your skin with SPF 30 sunscreen.', price: '₱850' },
        { name: 'SPF 50 Sunscreen', description: 'High protection with SPF 50 sunscreen.', price: '₱1,050' },
        { name: 'SPF 70 Sunscreen', description: 'Ultimate protection with SPF 70 sunscreen.', price: '₱1,250' },
    ];


    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
        `;

        productsContainer.appendChild(productElement);
    });
}

const xmlData = `
<products>
    <product>
        <name>SPF 30 Sunscreen</name>
        <description>Protect your skin with SPF 30 sunscreen.</description>
        <price>₱850</price>
    </product>
</products>`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlData, "application/xml");
const product = xmlDoc.getElementsByTagName('product')[0];
const productName = product.getElementsByTagName('name')[0].textContent;
const productDescription = product.getElementsByTagName('description')[0].textContent;
const productPrice = product.getElementsByTagName('price')[0].textContent;


document.getElementById('product-name').textContent = `Product: ${productName}`;
document.getElementById('product-description').textContent = `Description: ${productDescription}`;
document.getElementById('product-price').textContent = `Price: ${productPrice}`;

const apiKey = '691c94df41016cdc19f21018e3fdf1d8';
const city = 'Manila'; 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const cityName = data.name;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const weatherCondition = data.weather[0].description;


        document.getElementById('city-name').textContent = `City: ${cityName}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('weather-condition').textContent = `Condition: ${weatherCondition}`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
