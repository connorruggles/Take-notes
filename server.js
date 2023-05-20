// Import Express.js
const express = require('express');
const path = require('path');
const api = require('./routes/api_routes');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;

const getNotes = () => {
  const notes = fs.readFileSync(path.resolve(__dirname, './db/db.json'), {encoding: 'utf-8'});
return JSON.parse(notes);
};

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", api);
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));
app.get('/api/notes', (req, res) => res.json(getNotes()));
app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)
);
