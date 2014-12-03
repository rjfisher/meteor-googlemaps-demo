Template.locations.helpers({
  locations: function() {
    return Locations.find().fetch();
  }
});
