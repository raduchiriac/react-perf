var intervalForRandomness = 0;
throwRandomness = function () {
  intervalForRandomness = Meteor.setInterval(function () {
    Meteor.call('addRandomPoints');
  }, 100);
};

stopRandomness = function () {
  Meteor.clearInterval(intervalForRandomness);
};
Template.Layout.events({
  'click .inc': function (event) {
    if (!!intervalForRandomness) {
      stopRandomness();
      $(event.target).html('Start Randomness');
    } else {
      throwRandomness();
      $(event.target).html('Stop Randomness');
    }
  }
});
