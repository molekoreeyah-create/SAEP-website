const map = L.map('map').setView([-33.8885, 18.5665], 15);

L.tileLayer('http//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attibution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-33.8885, 18.5665]).addTo(map)
.bindPopup ('SAEP office, N1 City, Cape Town')
.openPopup ();