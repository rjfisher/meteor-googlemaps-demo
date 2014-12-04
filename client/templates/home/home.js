Template.home.rendered = function(){
  var itemsHandler = false;

  Deps.autorun(function() {
    var locations = Locations.find().fetch();
    if (!locations)
      return;

    var ids = [];
    _.each(locations,function(location){
      ids.push(location._id);

      var newItemsHandler = Meteor.subscribe('items', ids);
      if(itemsHandler)
        itemsHandler.stop();

      itemsHandler = newItemsHandler;
    });
  });
};

Template.home.helpers({
  numItems: function() {
    return Items.find().count();
  },

  items: function() {
    return Items.find();
  }
});
