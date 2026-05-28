const express = require('express');
const router = express.Router();
const ctrlTravlr = require('../controllers/travlrController');

/* GET home page */
router.get('/', ctrlTravlr.index);

/* GET travel page */
router.get('/travel', ctrlTravlr.travel);

module.exports = router;