Meteor.methods({
  addPoints: function (userId, points) {
    Players.update(userId, {
      $inc: {
        score: +points
      }
    });
  },
  addRandomPoints: function () {
    return Players.update({
      _id: {
        '$regex': randomiex(2)
      }
    }, {
      $inc: {
        score: parseInt(Math.random() * 20, 10)
      }
    }, {
      multi: true
    });
  }
});
Meteor.startup(function () {
  if (Players.find().count() === 0) {
    _(1000).times(function (n) {
      var u = Fake.user({
        fields: ['name', 'surname', 'email']
      });
      u.phrase = Fake.paragraph([100]);
      u.score = parseInt(Math.random() * 50, 10);
      Players.insert(u);
    });
  }
});
Meteor.publish("players", function (options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Players.find({}, options);
});
