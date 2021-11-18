const express = require('express');
const app = express();
const fs = require('fs');
const notes = require('./db/db.json');
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
    res.json(notes);
});

app.post('/notes', (req, res) =>{
    req.body.id = note.length.toString();
    const notes = createNote(req.body, note);
    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
