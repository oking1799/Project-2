const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let LocationModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5,
  },

  review: {
    type: String,
    required: false,
    trim: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

LocationSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  latitude: doc.latitude,
  longitude: doc.longitude,
  rating: doc.rating,
  review: doc.review,
});

LocationSchema.statics.findByOwner = (ownerID, callback) => {
  const search = {
    owner: convertId(ownerID),
  };

  return LocationModel.find(search).select('name latitude longitude rating review').lean().exec(callback);
};

LocationModel = mongoose.model('Location', LocationSchema);

module.exports.LocationModel = LocationModel;
module.exports.LocationSchema = LocationSchema;
