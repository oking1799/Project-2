const models = require('../models');

const { Location } = models;

const mapPage = (req, res) => {
  Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An Error Occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), locations: docs });
  });
};

const makeLocation = (req, res) => {
  if (!req.body.name || !req.body.latitude || !req.body.longitude) {
    return res.status(400).json({ error: 'A location name, latitude and longitude are required, otherwise I cant place a location -T. Shitty Project' });
  }

  const locationData = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rating: req.body.rating,
    review: req.body.review,
  };

  const newLocation = new Location.LocationModel(locationData);

  const locationPromise = newLocation.save();

  locationPromise.then(() => res.json({ redirect: '/map' }));

  locationPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Location already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return locationPromise;
};

const getLocations = (request, response) => {
  const req = request;
  const res = response;

  return Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ locations: docs });
  });
};

module.exports.newLocation = makeLocation;
module.exports.getLocations = getLocations;
module.exports.mapPage = mapPage;