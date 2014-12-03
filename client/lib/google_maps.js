gmaps = {
  map: null,

  bounds: {},

  markers: [],

  latLngs: [],

  markerData: [],

  addMarker: function(marker) {
    var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
    var gMarker = new google.maps.Marker({
      position: gLatLng,
      map: this.map,
      title: marker.title,
      //animation: google.maps.Animation.DROP,
      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    this.latLngs.push(gLatLng);
    this.markers.push(gMarker);
    this.markerData.push(marker);
    return gMarker;
  },

  clearMarkers: function() {
    _.each(this.markers, function(marker) {
      marker.setMap(null);
    });

    this.markers = [];
    this.latLngs = [];
    this.markerData = [];
  },

  markerExists: function(key, val) {
    _.each(this.markerData, function(marker) {
      if (marker[key] === val) {
        return true;
      }
    });

    return false;
  },

  initialize: function() {
    var mapOptions = {
      zoom: 16,
      minZoom: 12,
      center: new google.maps.LatLng(40.044171, -76.313411),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions
    );

    google.maps.event.addListener(map, 'idle', function() {
      var b = map.getBounds();
      var bounds = {
        latMin: b.getSouthWest().lat(),
        latMax: b.getNorthEast().lat(),
        lngMin: b.getSouthWest().lng(),
        lngMax: b.getNorthEast().lng()
      };

      Session.set('bounds', bounds);
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
