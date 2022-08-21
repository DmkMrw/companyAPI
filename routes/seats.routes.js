const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');

const SeatsController = require('../controllers/seats.controller');
// SEATS

router.get('/seats', TestimonialController.getAll);
router.get('/seats/:id', TestimonialController.getId);
router.post('/seats/', TestimonialController.post);
router.put('/seats/:id', TestimonialController.put);
router.delete('/seats/:id', TestimonialController.delete);




module.exports = router;