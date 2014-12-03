Template.locations.helpers({
  locations: function() {
    var bounds = Session.get('bounds');
    if (!bounds)
      return null;

    return Locations.find({lat: {$gt: bounds.latMin, $lt: bounds.latMax},
      lng: {$gt: bounds.lngMin, $lt: bounds.lngMax}}).fetch();
  }
});
