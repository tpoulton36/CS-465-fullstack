/* GET home page */
const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

/* GET travel page */
const travel = (req, res) => {
  res.render('travel', { title: 'Travel' });
};

module.exports = {
  index,
  travel
};