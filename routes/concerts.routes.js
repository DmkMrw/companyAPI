const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');


router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getId);
router.get('/concerts/performer/:performer', ConcertController.getConcertByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getConcertByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getConcertByPrice);
router.get('/concerts/day/:day', ConcertController.getConcertByDay);
router.post('/concerts/', ConcertController.post);
router.put('/concerts/:id', ConcertController.put);
router.delete('/concerts/:id', ConcertController.delete);


module.exports = router;