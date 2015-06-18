Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

var subs = new SubsManager();

/* List of the routes */
Router.map(function () {

  /* home for devs */
  this.route('Players', {
    path: '/',
    subscriptions: function () {
      return subs.subscribe('players');
    },
    data: function () {
      return Players.find({}, {
        limit: 100
      });
    },
    waitOn: function () {
      Meteor.subscribe('players');
    }
  });
});

Router.onBeforeAction(function () {
  this.next();
});
