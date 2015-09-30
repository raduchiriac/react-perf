Meteor.publish("players", function (options) {
  check(options, {
    sort: Object,
    limit: Number,
    fields: Object
  });
  return Players.find({}, options);
});
