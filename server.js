const express = require('express');
const app = express();
const { note } = require('./db/db.json');
const PORT = process.env.PORT || 3001;

app.get('/notes', (req, res) => {
    res.json(note);
});

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}`);
});
