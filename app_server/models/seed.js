const mongoose = require('mongoose');
const fs = require('fs');

require('./db');
const Trip = require('./travlr');

const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

Trip.deleteMany({})
  .then(() => {
    return Trip.insertMany(trips);
  })
  .then((docs) => {
    console.log(`${docs.length} trips inserted`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });