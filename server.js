const express = require('express');
const path = require('path');
const uuid = require('uuid').v4;
const cors = require('cors');
const db = require('./db')

//import routes
const testimonialRoutes = require('./routes/testimonials.routes')
const concertRoutes = require('./routes/concerts.routes')


const app = express();

const seats = db.seats;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/', testimonialRoutes);
app.use('/api', concertRoutes);




// SEATS
app.get('/seats', (req, res) => {
  res.json(seats)
});

app.get('/seats/:id', (req, res) => {
  res.json(seats[req.params.id-1])
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid();
  const newSeat = { id, day, seat, client, email };
  seats.push(newSeat);
  res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
  const id = req.params.id-1;
  seats.splice(seats[id], 1);
  res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id-1;
  const editSeat = seats[id];
  editSeat.day = day;
  editSeat.seat = seat;
  editSeat.client = client;
  editSeat.email = email;
  res.json({ message: 'OK' });
});


app.use((req, res) => {
  res.status(404).json('404 not found...');
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});