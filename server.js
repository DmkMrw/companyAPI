const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const uuid = require('uuid').v4;
const db = require('./db')

//     const db = [
//       { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
//       { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
//       { id: 3, author: 'Paul Doe', text: 'Vel blanditiis hic tempora ab culpa.' },
//       { id: 4, author: 'Sean Doe', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' },
// ];


const app = express();

app.engine('hbs', hbs());

app.set('view engine', '.hbs');

const testimonials = db.testimonials;
const concerts = db.concerts;
const seats = db.seats;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TESTIMONIALS
app.get('/testimonials', (req, res) => {
  res.json(testimonials)
});

app.get('/testimonials/random', (req, res) => {
  res.json(testimonials[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(testimonials[req.params.id-1])
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonials = { id, author, text };
  testimonials.push(newTestimonials);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id-1;
  const testimonial = testimonials[id];
  testimonial.author = author;
  testimonial.text = text;
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id-1;
  testimonials.splice(db[id], 1);
  res.json({ message: 'OK' });
});

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