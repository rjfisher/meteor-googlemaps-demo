Template.map.rendered = function() {
  if (!Session.get('map')) {
    gmaps.initialize();
  }

  var liveMarkers = LiveMaps.addMarkersToMap(gmaps.map, [{
	  cursor: Locations.find(),
	  onClick: function() {
      Router.go('/locations/' + this.id);
    },
	  transform: function(location) {
	    return {
	      title: location.name,
              position: new google.maps.LatLng(location.loc.lat, location.loc.lon),
	      animation: google.maps.Animation.DROP,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	    };
	  }
	}]);
}

Template.map.helpers({
  items: function() {
    var items = [];
    var locations = Locations.find().fetch();
    _.each(locations, function(loc) {
      items.push.apply(items, loc.items);
    });

    items.sort(function(a, b) {
      if (a.rating < b.rating)
        return 1;
      if (a.rating > b.rating)
        return -1;
      return 0;
    });

    return items;
  },

  locationCount: function() {
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

    gmaps.centerMap(result.loc.lat, result.loc.lon);
  }
});

Template.map.destroyed = function() {
  Session.set('map', false);
}
