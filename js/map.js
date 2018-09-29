var mymap = L.map('mapid').fitBounds([
    [47.364991, -62.010143],
    [24.497383, -121.859223]
]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVycGxlYmlrZXIiLCJhIjoiY2psd3VsNWFyMDI5aTNxcnQ1MzRyMWNieiJ9.m_JdsfQqLcKB_f3YXyhWmA'
}).addTo(mymap);

var marker1 = L.marker([40.7127837,-74.0059413]).addTo(mymap);
var marker2 = L.marker([42.331427,-83.0457538]).addTo(mymap);
var marker3 = L.marker([29.7604267,-95.3698028]).addTo(mymap);
var marker4 = L.marker([47.6062095,-122.3320708]).addTo(mymap);
var marker5 = L.marker([34.0522342,-118.2436849]).addTo(mymap);

marker1.bindPopup('<span style="line-height: 2em"><b><a href="nyc.html"><i style="font-size: 16px; width: 22px;" class="fas fa-images"></i>&nbsp;New York City</a></b><br /><i title="population" style="font-size: 16px; width: 22px;" class="fas fa-users"></i>&nbsp;8,622,698<br /><i style="font-size: 16px; width: 22px;" title="year founded" class="fas fa-hourglass-start"></i>&nbsp;1624</span>').openPopup();
marker2.bindPopup('<span style="line-height: 2em"><b><a href="detroit.html"><i style="font-size: 16px; width: 22px;" class="fas fa-images"></i>&nbsp;Detroit</a></b><br /><i title="population" style="font-size: 16px; width: 22px;" class="fas fa-users"></i>&nbsp;672,795<br /><i style="font-size: 16px; width: 22px;" title="year founded" class="fas fa-hourglass-start"></i>&nbsp;1701</span>').openPopup();
marker3.bindPopup('<span style="line-height: 2em"><b><a href="houston.html"><i style="font-size: 16px; width: 22px;" class="fas fa-images"></i>&nbsp;Houston</a></b><br /><i title="population" style="font-size: 16px; width: 22px;" class="fas fa-users"></i>&nbsp;2,099,451<br /><i style="font-size: 16px; width: 22px;" title="year founded" class="fas fa-hourglass-start"></i>&nbsp;1836</span>').openPopup();
marker4.bindPopup('<span style="line-height: 2em"><b><a href="seattle.html"><i style="font-size: 16px; width: 22px;" class="fas fa-images"></i>&nbsp;Seattle</a></b><br /><i title="population" style="font-size: 16px; width: 22px;" class="fas fa-users"></i>&nbsp;704,352<br /><i style="font-size: 16px; width: 22px;" title="year founded" class="fas fa-hourglass-start"></i>&nbsp;1851</span>').openPopup();
marker5.bindPopup('<span style="line-height: 2em"><b><a href="la.html"><i style="font-size: 16px; width: 22px;" class="fas fa-images"></i>&nbsp;Los Angeles</a></b><br /><i title="population" style="font-size: 16px; width: 22px;" class="fas fa-users"></i>&nbsp;3,792,621<br /><i style="font-size: 16px; width: 22px;" title="year founded" class="fas fa-hourglass-start"></i>&nbsp;1781</span>').openPopup();

var popup = L.popup()
    .setLatLng([43.331427,-83.0457538])
    .setContent("Click on a pin to learn more about the city and see the photos")
    .openOn(mymap);