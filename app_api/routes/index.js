const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindCode);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;