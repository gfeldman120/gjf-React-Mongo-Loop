const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleSong = async (e, onSongAdded) => {
  e.preventDefault();

  const artist = e.target.querySelector('#songArtist').value;
  const title = e.target.querySelector('#songTitle').value;

  console.log('Form submitted:', artist, title);

  await fetch('addSong', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({artist, title})
  });

  onSongAdded();

  return false;
};

const SongForm = (props) => {
  return (
    <form id="songForm" onSubmit={(e) => handleSong(e, [props.triggerReload])}>
      <label htmlFor="songArtist">Artist: </label>
      <input id="songArtist" type="text" name="artist" placeholder="Artist" />
      <label htmlFor="songTitle">Title: </label>
      <input id="songTitle" type="text" name="title" placeholder="Title" />
      <input type="submit" value="Add Song" />
    </form>
  );
};

const SongList = (props) => {
  const [songs, setSongs] = useState(props.songs);

  useEffect(() => {
    const loadSongsFromServer = async () => {
      console.log('Loading songs');
      const response = await fetch('/getSongs');
      const data = await response.json();
      setSongs(data);
    };
    loadSongsFromServer();
  }, [props.reload]);

  if (songs.length === 0) {
    return (
      <div>
        <h3>No Songs Yet!</h3>
      </div>
    );
  }

  const songNodes = songs.map((song) => {
    return (
      <div key={song._id}>
        <h2>{song.artist} - <i>{song.title}</i></h2>
      </div>
    );
  });

  return (
    <div>
      <h1>My favorite songs!</h1>
      {songNodes}
    </div>
  );
};

const App = () => {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <SongForm triggerReload={() => setReload(!reload)}/>
      <SongList songs={[]} reload={reload}/>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
