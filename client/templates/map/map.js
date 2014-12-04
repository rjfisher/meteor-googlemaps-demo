Template.map.rendered = function() {
  if (!Session.get('map')) {
    gmaps.initialize();
  }

  Deps.autorun(function() {
    gmaps.checkMarkers();

    var locations = Locations.find().fetch();
    console.log(Locations.find().count());

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

Template.map.helpers({
  numLocations: function() {
    return Locations.find().count();
  }
});

Template.map.events({
  'submit form': function(e) {
    e.preventDefault();

    var locationName = $(e.target).find('[name=name]').val();

    var result = Locations.findOne({name: locationName});

    if(!result) {
      toastr.warning('Your location was not found.');
      return;
    }

    gmaps.centerMap(result.lat, result.lng);
  }
});

Template.map.destroyed = function() {
  Session.set('map', false);
}
