const router = require("express").Router();
const { findById, createNewNote, filterByQuery } = require("../lib/note");
const { notes }  = require('../db/db.json');

// GET, POST, and DELETE
// Get all notes
router.get('/notes', (req,res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// GET note by id
router.get('/notes/:id', (req, res) =>{
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result !== -1) {
        notes.splice(result, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;