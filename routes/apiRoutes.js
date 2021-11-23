const router = require("express").Router();
const saveNote = require("../db/note");

// GET, POST, and DELETE
// Get all notes
router.get('/notes', (req,res) => {
    saveNote
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// POST note
router.post('/notes', (req, res) => {
    saveNote
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
    saveNote
        .deleteNote(req.params.id)
        .then(() => res.json({ok: true}))
        .catch(err => res.status(500).json(err));
});

module.exports = router;