Template.map.rendered = function() {
  if (!Session.get('map')) {
    gmaps.initialize();
  }

  Deps.autorun(function() {
    gmaps.checkMarkers();

    var locations = Locations.find().fetch();

    if (locations) {
      _.each(locations, function(location) {
        if(location) {
          if (!gmaps.markerExists('id', location._id)) {
              var marker = {
                id: location._id,
                lat: location.lat,
                lng: location.lng,
                title: location.name
              };

              gmaps.addMarker(marker);
          }
        }
      });
    }
  });
}

Template.map.destroyed = function() {
  Session.set('map', false);
}
