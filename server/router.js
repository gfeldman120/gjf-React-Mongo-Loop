// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');

const router = (app) => {
  app.get('/getSongs', controllers.Song.getSongs);

  app.post('/addSong', controllers.Song.addSong);

  app.get('/', controllers.Song.appPage);
};

module.exports = router;
