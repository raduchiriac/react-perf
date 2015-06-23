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
  this.route('Players', {
    path: '/',
    subscriptions: function () {
      return subs.subscribe('players');
    },
    data: function () {
      return Players.find({});
    },
    waitOn: function () {
      Meteor.subscribe('players');
    }
  });
  this.route('Tabular', {
    path: '/tabular',
    subscriptions: function () {
      return subs.subscribe('players');
    },
    data: function () {
      return Players.find({});
    },
    waitOn: function () {
      Meteor.subscribe('players');
    }
  });
});

Router.onBeforeAction(function () {
  this.next();
});
