Template.location.helpers({
  selected : function() {
    var selected = Session.get('selected');
    if (!selected)
      return 'unselected';

    return (selected === this._id) ? 'selected' : 'unselected';
  }
});
