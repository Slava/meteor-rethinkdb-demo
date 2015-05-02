Cities = new Rethink.Table('cities');
r = Rethink.r;

if (Meteor.isClient) {
  Meteor.subscribe('data');

  Template.hello.helpers({
    cities: function () {
      return Cities.run();
    },

    sortedCities: function () {
      // r.desc isn't yet supported by reqlite, so:
      // Cities.orderBy(r.desc('population')).run()
      // doesn't work on the client.
      
      var ascending = _.sortBy(Cities.fetch(), 'population');
      return ascending.reverse();
    },

    citiesIn: function (country) {
      return Cities.filter({country: country}).run();
    }
  });
}

if (Meteor.isServer) {
  if (Cities.count().run() === 0) {
    Cities.insert([{
      name: 'Wenzhou',
      population: 3039439,
      country: 'China'
    }, {
      name: 'Addis Ababa',
      population: 3103673,
      country: 'Ethiopia'
    }, {
      name: 'Ürümqi',
      population: 3112559,
      country: 'China'
    }, {
      name: 'Shanghai',
      population: 24150000,
      country: 'China'
    }, {
      name: 'Karachi',
      population: 20000000,
      country: 'Pakistan'
    }]).run();
  }
  
  Meteor.publish("data", function () {
    return Cities.orderBy({ index: 'id' }).limit(100);
  });
}
