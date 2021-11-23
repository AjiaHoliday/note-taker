const path = require('path');
const router = require('express').Router();

// start with index.html on page load
router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


module.exports = router;