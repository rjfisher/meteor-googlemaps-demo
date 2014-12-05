gmaps = {
  map: null,

  bounds: {},

  markers: [],

  latLngs: [],

  markerData: [],

  locationsHandler: false,
  itemsHandler: false,

  addMarker: function(marker) {
    var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
    var gMarker = new google.maps.Marker({
      position: gLatLng,
      map: this.map,
      title: marker.title,
      //animation: google.maps.Animation.DROP,
      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    google.maps.event.addListener(gMarker, 'click', function() {
      if (Session.get('selected') === marker.id) {
        Session.set('selected', null);
      } else {
        Session.set('selected', marker.id);
      }
    });

    this.latLngs.push(gLatLng);
    this.markers.push(gMarker);
    this.markerData.push(marker);
    return gMarker;
  },

  centerMap: function(lat, lng) {
    if ((!lat) || (!lng))
      return;

    var latLng = new google.maps.LatLng(lat, lng);
    this.map.setCenter(latLng);
  },

  checkMarkers: function() {
    var _this = this;

    _.each(this.markers, function(marker) {
      if ((marker.position.lat() > _this.bounds.latMax) ||
         (marker.position.lat() < _this.bounds.latMin) ||
         (marker.position.lng() > _this.bounds.lngMax) ||
         (marker.position.lng() < _this.bounds.lngMin))
         _this.deleteMarker(marker);
    });
  },

  clearMarkers: function() {
    _.each(this.markers, function(marker) {
      marker.setMap(null);
    });

    this.markers = [];
    this.latLngs = [];
    this.markerData = [];
  },

  deleteMarker: function(marker) {
    var _this = this;

    _.each(this.markers, function(storedMarker, index) {
      if (storedMarker === marker) {
        storedMarker.setMap(null);
        _this.markers.splice(index, 1);
        _this.latLngs.splice(index, 1);
        _this.markerData.splice(index, 1);
        return;
      }
    });
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
    var _this = this;

    var mapOptions = {
      zoom: 22,
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

      _this.bounds = bounds;

      var queryBounds = {
        a: {x: bounds.lngMin, y: bounds.latMax},
        b: {x: bounds.lngMax, y: bounds.latMax},
        c: {x: bounds.lngMax, y: bounds.latMin},
        d: {x: bounds.lngMin, y: bounds.latMin}
      };

      var newlocationsHandler = Meteor.subscribe('locations', queryBounds);
      if (_this.locationsHandler)
        _this.locationsHandler.stop();

      _this.locationsHandler = newlocationsHandler;

      var newitemsHandler = Meteor.subscribe('items', queryBounds);
      if (_this.itemsHandler)
        _this.itemsHandler.stop();

      _this.itemsHandler = newitemsHandler;
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
