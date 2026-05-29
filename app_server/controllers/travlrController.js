/* GET home page */
const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

/* GET travel page */
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = (req, res) => {
  res.render('travel', {
    title: 'Travel',
    trips
  });
};

module.exports = {
  index,
  travel
};