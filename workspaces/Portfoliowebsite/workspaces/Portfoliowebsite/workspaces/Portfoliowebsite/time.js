let map;
let userMarker;
const chargingStations = [
    { lat: 42.317432, lng: -83.026772, name: "Station 1" },
    { lat: 42.307432, lng: -83.036772, name: "Station 2" },
    { lat: 42.327432, lng: -83.016772, name: "Station 3" }
];
let directionsService;
let directionsRenderer;

function initMap() {
    console.log("Initializing map...");
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.314937, lng: -83.036363 },
        zoom: 13
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    chargingStations.forEach(station => {
        new google.maps.Marker({
            position: { lat: station.lat, lng: station.lng },
            map: map,
            title: station.name
        });
    });

    document.getElementById("car-form").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted...");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(findNearestStation, handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
}

function findNearestStation(position) {
    const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    console.log("User location: ", userLocation);

    if (userMarker) {
        userMarker.setMap(null);
    }
    userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location"
    });
    map.setCenter(userLocation);

    let nearestStation = null;
    let minDistance = Number.MAX_VALUE;

    chargingStations.forEach(station => {
        const distance = getDistance(userLocation, station);
        console.log(`Distance to ${station.name}: ${distance} km`);
        if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station;
        }
    });

    if (nearestStation) {
        calculateAndDisplayRoute(userLocation, nearestStation);
    } else {
        alert("No charging stations found.");
    }
}

function calculateAndDisplayRoute(origin, destination) {
    const request = {
        origin: origin,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            alert(`Nearest Charging Station: ${destination.name}`);
        } else {
            alert("Directions request failed due to " + status);
        }
    });
}

function getDistance(location1, location2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (location2.lat - location1.lat) * Math.PI / 180;
    const dLng = (location2.lng - location1.lng) * Math.PI / 180;
    const a = 
        0.5 - Math.cos(dLat)/2 + 
        Math.cos(location1.lat * Math.PI / 180) * Math.cos(location2.lat * Math.PI / 180) * 
        (1 - Math.cos(dLng)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
