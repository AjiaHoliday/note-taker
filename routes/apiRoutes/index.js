const router = require("express").Router();
const { findById, createNewNote } = require("../../lib/note");
const notes = require('../../db/db.json');

// GET, POST, and DELETE
// Get all notes
router.get('/notes', (req,res) => {
    let results = notes;
    res.json(results);
});

// GET note by id
router.get('/notes/:id', (req, res) =>{
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res, next) => {
    const result = findById(req.params.id, notes);
    if (result !== -1) {
        notes.splice(result, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = router;