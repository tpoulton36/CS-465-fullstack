const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindCode);
router.post('/trips', tripsController.tripsAddTrip);

module.exports = router;