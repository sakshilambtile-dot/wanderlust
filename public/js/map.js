

var map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var mapLocation = listing.location + ", " + listing.country;

fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(mapLocation)}&format=json`)
    .then(res => res.json())
    .then(data => {
        if(data && data.length > 0) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            map.setView([lat, lon], 10);
            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
                .openPopup();
        }
    });