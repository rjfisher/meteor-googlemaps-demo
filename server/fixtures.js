var latMin = 40.00860681,
    latMax = 40.113712684,
    lngMin = -76.5542851,
    lngMax = -75.0334645;

if (Locations.find().count() === 0) {
  for (var i = 0; i < 10000; i++) {
    var lat = Math.random()*(latMax - latMin) + latMin;
    var lng = Math.random()*(lngMax - lngMin) + lngMin;

    if (i % 1000 === 0) {
      console.log(i + ': (Lat, Lng)' + lat + ', ' + lng + ')');
    }

    Locations.insert({
      name: 'Location: ' + i,
      address: '1234 Fake Street',
      lat: lat,
      lng: lng
    });
  }
}
