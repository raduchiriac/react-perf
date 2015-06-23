TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);
TabularTables.Players = new Tabular.Table({
  name: "PlayersList",
  collection: Players,
  columns: [{
    data: "name",
    title: "Name"
  }, {
    data: "surname",
    title: "Surname"
  }, {
    data: "score",
    title: "Score"
  }]
});
