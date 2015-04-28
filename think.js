if (Meteor.isClient) {
  Cities = new Rethink.Table('cities');
  Meteor.subscribe('data')
  Template.hello.helpers({
    items: function () {
      return Cities.run();
    }
  });
}

if (Meteor.isServer) {
  Cities = new Rethink.Table('cities');

  var r = Rethink.r;
  Meteor.publish("data", function () {
    return Cities.orderBy({ index: 'id' }).limit(100);
  });
}
