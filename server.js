const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const uuid = require('uuid').v4;
const cors = require('cors');
const db = require('./db')

//import routes
const testimonialRoutes = require('./routes/testimonials.routes.js')


const app = express();

app.engine('hbs', hbs());

app.set('view engine', '.hbs');

const concerts = db.concerts;
const seats = db.seats;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/', testimonialRoutes);


// CONCERTS
app.get('/concerts', (req, res) => {
  res.json(concerts)
});

app.get('/concerts/:id', (req, res) => {
  res.json(concerts[req.params.id-1])
});

app.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid();
  const newConcert = { id, performer, genre, price, day, image };
  concerts.push(newConcert);
  res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
  const id = req.params.id-1;
  testimonials.splice(concerts[id], 1);
  res.json({ message: 'OK' });
});

app.put('/concerts/:id', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id-1;
  const concert = concerts[id];
  concert.performer = performer;
  concert.genre = genre;
  concert.price = price;
  concert.day = day;
  concert.image = image;
  res.json({ message: 'OK' });
});

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