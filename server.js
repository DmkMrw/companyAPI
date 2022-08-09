const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const uuid = require('uuid').v4;

    const db = [
      { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
      { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.engine('hbs', hbs());

app.set('view engine', '.hbs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db)
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id-1])
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonials = { id, author, text };
  db.push(newTestimonials);
  res.json({ message: 'ok' });
});

app.put('/testimonials/:id', (req, res) => {
  res.render('db', { layout: false, id: req.params.id })
});

app.delete('/testimonials/:id', (req, res) => {
  res.render('db', { layout: false, id: req.params.id })
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});