LiveMaps = {
  addMarkersToMap: function(map, cursors) {
    var cursor, queries;
    if (!Array.isArray(cursors)) {
      cursors = [cursors];
    }
    queries = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cursors.length; _i < _len; _i++) {
        cursor = cursors[_i];
        _results.push(liveMarkers(map, cursor));
      }
      return _results;
    })();
    return {
      stop: function() {
        var stopQuery, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = queries.length; _i < _len; _i++) {
          stopQuery = queries[_i];
          _results.push(stopQuery());
        }
        return _results;
      }
    };
  }
};

liveMarkers = function(map, cursor) {
  var addMarker, liveQuery, markers, onClick, removeMarker, transform;
  markers = [];
  if (cursor.observe) {
    transform = function(doc) {
      return {
        position: new google.maps.LatLng(doc.latitude || doc.lat || doc.location[1], doc.longitude || doc.lon || doc.lng || doc.location[0]),
        title: doc.title || doc.name || doc.label,
        animation: doc.animation || google.maps.Animation.DROP,
        icon: doc.icon || '//maps.google.com/mapfiles/ms/icons/green-dot.png'
      };
    };
  } else {
    transform = cursor.transform;
    onClick = cursor.onClick;
    cursor = cursor.cursor;
  }
  addMarker = function(doc) {
    var options;
    options = transform(doc);
    if (!options.map) {
      options.map = map;
    }
    var marker = new google.maps.Marker(options);
    marker.id = doc._id;
    google.maps.event.addListener(marker, 'click', onClick);
    return markers[doc._id] = marker;
  };
  removeMarker = function(doc) {
    markers[doc._id].setMap(null);
    return delete markers[doc._id];
  };
  liveQuery = cursor.observe({
    added: addMarker,
    changed: function(newDoc, oldDoc) {
      removeMarker(oldDoc);
      return addMarker(newDoc);
    },
    removed: removeMarker
  });
  return function() {
    var marker, _i, _len, _results;
    liveQuery.stop();
    _results = [];
    for (_i = 0, _len = markers.length; _i < _len; _i++) {
      marker = markers[_i];
      _results.push(marker.setMap(null));
    }
    return _results;
  };
};

if (typeof Package === "undefined" || Package === null) {
  this.LiveMaps = LiveMaps;
}
