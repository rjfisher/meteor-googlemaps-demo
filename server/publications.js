Meteor.publish('locations', function(bounds) {
  if (bounds && bounds.latMin && bounds.latMax && bounds.lngMin && bounds.lngMax) {
    return Locations.find({lat: {$gt: bounds.latMin, $lt: bounds.latMax},
                           lng: {$gt: bounds.lngMin, $lt: bounds.lngMax}});
  }
});
