let form = document.getElementById("form")
let input = document.getElementById("input")
let APIKEY = "929c3fb137d76d5125509209ff3560b2"
let display = document.getElementById("display")
let weatherSpeed1 = document.getElementById("weatherSpeed")
let button = document.getElementById("button")
import getWeather1 from "./map.js"

form.addEventListener("submit", function(event){
    event.preventDefault()
    let city = input.value
    getWeather(city)
    getWeather1()
    form.reset()
})

function getWeather(city){
    let weatherRequest = new XMLHttpRequest()
    weatherRequest.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)

    weatherRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
        let data = JSON.parse(this.responseText)
        printDataOnUI(data)
        console.log(data);
        
        
        }
    }
    
    weatherRequest.send()
}

function printDataOnUI(data) {
    display.innerHTML = ``;
    weatherSpeed1.innerHTML = ``;

    let windSpeed = data.wind.speed;
    let country = data.sys.country;
    let humidity = data.main.humidity;
    let feelsLike = (data.main.feels_like - 273.15).toFixed(); // Convert from Kelvin to Celsius
    let seaLevel = data.main.sea_level || 'N/A'; // Check if sea_level exists
    let temperature = (data.main.temp - 273.15).toFixed(); // Convert from Kelvin to Celsius
    let nameOfCity = data.name;
    let pressure = data.main.pressure || 'N/A'; // Pressure not "presure"
    let grndLevel = data.main.grnd_level || 'N/A'; // Check if grnd_level exists
    let description = data.weather[0].description;

    // Create wind speed section
    let windIcon = document.createElement("i");
    windIcon.classList.add("fa-solid", "fa-wind");

    let WindSpeed = document.createElement("p");
    WindSpeed.textContent = "Wind Speed";

    let windSpeedVal = document.createElement("p");
    windSpeedVal.textContent = `${windSpeed} km/h`;

    let speed1 = document.createElement("div");
    speed1.classList.add("speed");
    speed1.append(windIcon);

    let speed2 = document.createElement("div");
    speed2.classList.add("speed");
    speed2.append(WindSpeed);

    let speed3 = document.createElement("div");
    speed3.classList.add("speed");
    speed3.append(windSpeedVal);

    weatherSpeed1.append(speed1, speed2, speed3);

    // Create city and country section
    let locationIcon = document.createElement("i");
    locationIcon.classList.add("fa-solid", "fa-location-dot");

    let cityName = document.createElement("h2");
    cityName.textContent = `${nameOfCity},`;

    let countryName = document.createElement("h2");
    countryName.textContent = `${country}`;

    let location = document.createElement("div");
    location.classList.add("location");
    location.append(cityName, countryName);

    let cityCont = document.createElement("div");
    cityCont.classList.add("city");
    cityCont.append(locationIcon, location);

    // Create temperature and cloud icon section
    let cloudIcon = document.createElement("i");
    cloudIcon.classList.add("fa-solid", "fa-cloud-sun-rain", "fa-fade");

    let temp = document.createElement("h3");
    temp.textContent = `${temperature}°C`;

    let weatherCon = document.createElement("div");
    weatherCon.classList.add("weather-con");
    weatherCon.append(cloudIcon, temp);

    // Weather description
    let rainy = document.createElement("h4");
    rainy.textContent = `Feels like ${feelsLike}°C. ${description}`;

    let feels = document.createElement("div");
    feels.classList.add("feels");
    feels.append(rainy);

    // Append weather description
    let weatherDescript = document.createElement("div");
    weatherDescript.classList.add("weather-descript");
    weatherDescript.append(feels);

    // Create description section for humidity, pressure, etc.
    function createDescription(iconClass, label, value) {
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", iconClass);

        let iconsDiv = document.createElement("div");
        iconsDiv.classList.add("icons");
        iconsDiv.append(icon);

        let labelP = document.createElement("p");
        labelP.textContent = label;

        let valueH4 = document.createElement("h4");
        valueH4.textContent = value;

        let innerDescription = document.createElement("div");
        innerDescription.classList.add("inner-description");
        innerDescription.append(labelP, valueH4);

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");
        descriptionDiv.append(iconsDiv, innerDescription);

        return descriptionDiv;
    }

    let description1 = createDescription("fa-droplet", "Humidity", `${humidity}%`);
    let description2 = createDescription("fa-temperature-three-quarters", "Pressure", `${pressure} hPa`);
    let description3 = createDescription("fa-ruler-horizontal", "Sea Level", `${seaLevel} hPa`);
    let description4 = createDescription("fa-ruler-horizontal", "Ground Level", `${grndLevel} hPa`);

    // Append descriptions
    let descript = document.createElement("div");
    descript.classList.add("descript");
    descript.append(description1, description2, description3, description4);

    // Append everything to the main display
    display.append(cityCont, weatherCon, weatherDescript, descript);
}
