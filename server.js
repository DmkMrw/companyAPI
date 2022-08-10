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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use((req, res) => {
  res.status(404).json('404 not found...');
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});