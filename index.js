let form = document.getElementById("form")
let input = document.getElementById("city")
let display = document.getElementById("display")
let APIKEY = "929c3fb137d76d5125509209ff3560b2"

form.addEventListener("submit", function(event){
    event.preventDefault()
    let city = input.value
    getWeather(city)
    form.reset()
})

function getWeather(city){
    let weatherRequest = new XMLHttpRequest()
    weatherRequest.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)

    weatherRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
        let data = JSON.parse(this.responseText)
        printDataOnUI(data)
        }
    }
    
    weatherRequest.send()
}

function printDataOnUI(data){
    if(display.length === 0){
        display.style.display = "none"
    }else{
        display.style.display = "flex"
    }
    display.innerHTML = ``
    let temperature = data.main.temp
    let nameOfCity = data.name 

    let nameOfCityText = document.createElement("h2")
    nameOfCityText.textContent = nameOfCity

    let cityCont = document.createElement("div")
    cityCont.classList.add("city")

    let place = document.createElement("div")
    place.classList.add("location")

    let weather = document.createElement("div")
    weather.classList.add("weather")

    let locationIcon = document.createElement("i")
    locationIcon.classList.add("fa-solid", "fa-location-dot")

    let weatherCon = document.createElement("div")
    weatherCon.classList.add("weather-con")

    let cloudIcon = document.createElement("i")
    cloudIcon.classList.add("fa-solid", "fa-cloud-sun-rain", "fa-fade")

    let temp = document.createElement("h3")
    temp.textContent = `${(temperature - 273.15).toFixed()}°C`

    cityCont.append(locationIcon, nameOfCityText)
    weatherCon.append(cloudIcon, temp)
    place.append(cityCont)
    weather.append(weatherCon)
    display.append(place, weather)
}


function displayDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString(); // Get the date in a readable format
    const time = now.toLocaleTimeString(); // Get the time in a readable format
          
    // Set the content of the HTML elements
    document.getElementById('date').innerText = date;
    document.getElementById('time').innerText = time;
}
    
//Call the function every second to update the time dynamically
setInterval(displayDateTime, 1000);
displayDateTime()
 