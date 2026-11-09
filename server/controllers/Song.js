const models = require('../models');
const { Song } = models;

const appPage = (req, res) => {
  res.render('app');
};

const getSongs = async (req, res) => {
  try {
    const docs = await Song.find({}).lean().exec();
    return res.json(docs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving songs!' });
  }
};

const addSong = async (req, res) => {
  if (!req.body.artist || !req.body.title) {
    return res.status(400).json({ error: 'Artist and title are required!' });
  }

  try {
    const newSong = new Song({
      artist: req.body.artist,
      title: req.body.title
    });
    await newSong.save();
    return res.status(201).json({
      artist: newSong.artist,
      title: newSong.title
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error saving song!' });
  }
};

const deleteSong = async (req, res) => {
  try {
    return res.status(501).json({ error: 'Not built yet' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting song!' });
  }
};

module.exports = {
  appPage,
  getSongs,
  addSong,
  deleteSong,
};
