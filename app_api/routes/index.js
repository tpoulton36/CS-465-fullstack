const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  const headers = authHeader.split(' ');

  if (headers.length < 2) {
    console.log('Not enough tokens in Auth Header');
    return res.sendStatus(401);
  }

  const token = headers[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Token Validation Error!');
      return res.sendStatus(401);
    }

    req.auth = verified;
    next();
  });
}

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindCode);
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;