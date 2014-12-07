Template.home.helpers({
  transition: function () {
    return function(from, to, element) {
      return 'left-to-right';
    }
  },

  numItems: function() {
    return 0;
  },

  items: function() {
    return Items.find({}, {sort: {rating: -1}, limit: 15});
  }
});
