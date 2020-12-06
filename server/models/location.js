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

  country: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
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

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

});

LocationSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  country: doc.country,
  description: doc.description,
  rating: doc.rating,
  review: doc.review,
});

LocationSchema.statics.findByOwner = (ownerID, callback) => {
  const search = {
    owner: convertId(ownerID),
  };

  return LocationModel.find(search).select('name country description rating review').lean().exec(callback);
};



LocationModel = mongoose.model('Location', LocationSchema);

module.exports.LocationModel = LocationModel;
module.exports.LocationSchema = LocationSchema;
