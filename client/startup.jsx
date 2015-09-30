Meteor.startup(function () {
  injectTapEventPlugin();
  subs = new SubsManager();
  React.render(<App />, document.getElementById("container"));
});
