// Get access token at https://account.mapbox.com
mapboxgl.accessToken = // 'Your Access Token Goes Here' followed by a ';'

// Accesses the Mapbox API
let map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [-71.104081, 42.365554],
   zoom: 13
});

// Create a DOM element for each marker.
const busDiv = document.createElement('div');
busDiv.className = 'marker';

// Create a popup.
let popup = new mapboxgl.Popup({ offset: 25 }).setText('Bus Current Location');

// Adds a marker to the map
let marker = new mapboxgl.Marker(busDiv)
   .setLngLat([-71.092761, 42.357575])
   .setPopup(popup)
   .addTo(map);
let counter = 0;

// Gets the bus locations.
async function getBusLocations() {
   const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
   const response = await fetch(url);
   const json = await response.json();
   let lat = json.data[0].attributes.latitude;
   let lng = json.data[0].attributes.longitude;
   let coordinates = { 'lng': lng, 'lat': lat };
   marker.setLngLat(coordinates);
   console.log(new Date());
   console.log('Bus Location: ' + JSON.stringify(coordinates));
   return json.data;
}

// Runs the program to update the map. *Note: setTimeout should not be timed too fast or the servers could block you.
async function run() {
   let locations = await getBusLocations();
   setTimeout(run, 30000);
}

run();
