const router = require("express").Router();
const saveNote = require("../lib/note");

// GET, POST, and DELETE
// Get all notes
router.get('/notes', (req,res) => {
    saveNote
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
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