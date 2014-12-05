Template.home.helpers({
  numItems: function() {
    return 0;
  },

  items: function() {
    return Items.find({}, {sort: {rating: -1}, limit: 15});
  }
});
