const express = require('express');
const app = express();
const fs = require('fs');
const note = require('./db/db.json');
const path = require('path');
const PORT = process.env.PORT || 3001;

//Create a new note function
function createNote(body, note) {
    const notes = body;
    note.push(notes);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(note, null, 2)
    );
};

app.get('/notes', (req, res) => {
    res.json(noten);
});

app.post('/notes', (req, res) =>{
    req.body.id = note.length.toString();
    const notes = createNote(req.body, note);
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
