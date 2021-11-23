const fs = require('fs');
const util = require('util');

const readNote = util.promisify(fs.readFile);
const displayNote = util.promisify(fs.writeFile);

class Save {
    display(note) {
        return displayNote('db/db.json', JSON.stringify(note));
    }
    read() {
        return readNote('db/db.json', 'utf8');
    }
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (er) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    newNote(note) {
        const { title, text } = note;
        if (!title || !text) {
                    }
    }
    deleteNote(id) {

    }

}


// function filterByQuery(query, notesArray) {
//     let filteredResults = notesArray;
//     if(query.title) {
//         filteredResults = filteredResults.filter(note => note.title === query.title);
//     }
//     if(query.text) {
//         filteredResults = filteredResults.filter(note => note.text === query.text);
//     }
//     return filteredResults;
// }

// function findById(id, ...notesArray) {
//     const result = notesArray.filter(note => note.id === id)[0];
//     return result;
// }

// function createNewNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//       path.join(__dirname, '../db/db.json'),
//       JSON.stringify({ note: notesArray}, null, 2)
//     );
  
//     return note;
// }

module.exports = new Save();