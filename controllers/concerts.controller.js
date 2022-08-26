const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByPerformer = async (req, res) => {

  try {
    const perf = await Concert.find({ performer: req.params.performer });
    if (!perf) res.status(404).json({ message: 'Not found' });
    else res.json(perf);
  }
  catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.getConcertByGenre = async (req, res) => {

  try {
    const gen = await Concert.find({ genre : req.params.genre });
    if (!gen) res.status(404).json({ message: 'Not found' });
    else res.json(gen);
  }
  catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.getConcertByPrice = async (req, res) => {

  try {
    const price = await Concert.find({ price: { $gt: req.params.price_min, $lt: req.params.price_max } } );
    if (!price) res.status(404).json({ message: 'Not found' });
    else res.json(price);
  }
  catch (err) {
    res.status(500).json({ message: err });
  };
};
exports.getConcertByDay = async (req, res) => {

  try {
    const day = await Concert.find({ day: req.params.day } );
    if (!day) res.status(404).json({ message: 'Not found' });
    else res.json(day);
  }
  catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.post = async (req, res) => {

  try {

    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};