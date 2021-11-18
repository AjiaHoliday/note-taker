const express = require('express');
const fs = require('fs');
const path = require('path');
const noteDatabase = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// link to assets
app.use(express.static('public'));

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// start with index.html on page load
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET, POST, and DELETE
app.get('/api/notes', (req,res) => {
    let results = noteDatabase;
    res.json(results);
});

app.get('/api/notes/:id', (req, res) =>{
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
});

app.delete('api/notes/:id', (req, res, next) => {
    const noteIndex = findById(req.params.id, expressions);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
