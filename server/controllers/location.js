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
  if (!req.body.name || !req.body.country) {
    return res.status(400).json({ error: 'A location name and country are needed' });
  }


  const locationData = {
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    rating: req.body.rating,
    review: req.body.review,
    owner: req.session.account._id,
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

const getAllLocations = (request, response) => Location.LocationModel.find({}, (err, docs) => {
  if (err) {
    console.log(err);
    return response.status(400).json({ error: 'An error occured' });
  }

  return response.json({ locations: docs });
});

const searchLocation = (request, response) => Location.LocationModel.find({ name: request. }, (err, docs) => {
  console.log(request.body.path);

  if (err) {
    console.log(err);
    return response.status(400).json({ message: request });
  }

  return response.json({ locations: docs });
});


module.exports.make = makeLocation;
module.exports.getLocations = getLocations;
module.exports.getAllLocations = getAllLocations;
module.exports.searchLocation = searchLocation;

module.exports.mapPage = mapPage;
