const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');


const app = express();

app.engine('hbs', hbs());

app.set('view engine', '.hbs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.render('db', { layout: false })
});

app.get('/testimonials/:id', (req, res) => {
  res.render('db', { layout: false, id: req.params.id })
});

app.get('/testimonials/random', (req, res) => {
  res.render('db', { layout: false })
});

app.post('/testimonials', (req, res) => {
  res.render('db', { layout: false })
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