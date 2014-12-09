gmaps = {
  map: null,

  bounds: {},

  locationsHandler: false,

  initialize: function() {
    var mapOptions = {
      zoom: 18,
      minZoom: 12,
      center: new google.maps.LatLng(40.044171, -76.313411),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions
    );

    // Set up the search box
    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox(input);

    google.maps.event.addListener(searchBox, 'places_changed', function(){
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        toast.error('Location could not be found!');
        return;
      }

      if (places.length > 1) {
        toast.warn('More than one location was found!');
        return;
      }

      var place = places[0];
      map.setCenter(place.geometry.location);
    });

    google.maps.event.addListener(map, 'idle', function() {
      var b = map.getBounds();
      var queryBounds = {
        a: {x: b.getSouthWest().lng(), y: b.getNorthEast().lat()},
        b: {x: b.getNorthEast().lng(), y: b.getNorthEast().lat()},
        c: {x: b.getNorthEast().lng(), y: b.getSouthWest().lat()},
        d: {x: b.getSouthWest().lng(), y: b.getSouthWest().lat()}
      };

      var query = {
        id: null,
        bounds: queryBounds
      };

      var newlocationsHandler = Meteor.subscribe('locations', query);
      if (this.locationsHandler)
        this.locationsHandler.stop();

      this.locationsHandler = newlocationsHandler;
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var location = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

          this.currLocation = new google.maps.Marker({
            position: location,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: 'Your Location'
          });

          map.setCenter(location);
        }, function() {
          toastr.error('Geo-Location Error');
        });
      } else {
        toastr.error('Your browser doesn\'t support geolocation');
      }

      this.map = map;
      Session.set('map', true);
  }
}
