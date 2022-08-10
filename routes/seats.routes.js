const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const db = require('../db')

// SEATS

const seats = db.seats;

router.route('/seats').get((req, res) => {
  res.json(seats)
});

router.route('/seats/:id').get((req, res) => {
  res.json(seats[req.params.id-1])
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid();
  const newSeat = { id, day, seat, client, email };
  seats.push(newSeat);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id-1;
  seats.splice(seats[id], 1);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id-1;
  const editSeat = seats[id];
  editSeat.day = day;
  editSeat.seat = seat;
  editSeat.client = client;
  editSeat.email = email;
  res.json({ message: 'OK' });
});

module.exports = router;