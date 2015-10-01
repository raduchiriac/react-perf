Players.deny({
  update: function (userId, doc, fields, modifier) {
    return false;
  }
});
Players.allow({
  update: function (userId, doc, fields, modifier) {
    return true;
  }
});
