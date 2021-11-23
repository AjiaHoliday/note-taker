const fs = require('fs');
const util = require('util');
const { v4: uuidv4} = require('uuid');

const readNote = util.promisify(fs.readFile);
const displayNote = util.promisify(fs.writeFile);

class Save {
    display(note) {
        return displayNote('db/db.json', JSON.stringify({note}, null, 2));
    }
    read() {
        return readNote('db/db.json', 'utf8');
    }
    async getNotes() {
        const notes = await this.read();
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    }
    async addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Both title and text can not be blank');
        }
        // Use UUID package to add unique IDs
        const newNote = { title, text, id: uuidv4() };

        // Retrieve Notes, add the new note, update notes
        const notes = await this.getNotes();
        const updatedNotes = [...notes, newNote];
        this.display(updatedNotes);
        return newNote;
    }

    async deleteNote(id) {
        const notes = await this.getNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        return this.display(filteredNotes);
    }
}

module.exports = new Save();