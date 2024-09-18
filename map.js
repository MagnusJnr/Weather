let map;
let input = document.getElementById("input")
function getWeather1(event) {
    let city = input.value

  if (!city) {
    alert("Please enter a city name.")
    return;
  }

  let APIKEY = "929c3fb137d76d5125509209ff3560b2"
  let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`

  // Fetch city coordinates
  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data1 => {

      if (data1.length > 0) {
        let lat = data1[0].lat;
        let lon = data1[0].lon;

        displayMap(lat, lon);
      } else {
        document.getElementById("map").innerHTML = "City not found!";
      }
    })
    .catch(error => console.error('Error fetching city:', error));
}

function displayMap(lat, lon) {
  if (map) {
    map.remove();
  }

  map = L.map('map').setView([lat, lon], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).bindPopup("City Map").openPopup();
}


export default getWeather1