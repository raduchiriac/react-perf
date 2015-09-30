/*
Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

var subs = new SubsManager();

if (Meteor.isClient) {
  ApplicationController = RouteController.extend({
    subsOptions: function () {
      return {
        sort: {
          score: -1,
          name: 1
        },
        limit: 500
      };
    },
    data: function () {
      return Players.find({}, this.subsOptions());
    },
    waitOn: function () {
      return [
        subs.subscribe('players', this.subsOptions())
      ];
    }
  });
}

Router.map(function () {
  this.route('Players', {
    path: '/',
    controller: 'ApplicationController'
  });
});

Router.onBeforeAction(function () {
  this.next();
});
*/
