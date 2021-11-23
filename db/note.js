const fs = require('fs');
const util = require('util');
const { v4: uuidv4} = require('uuid');

const readNote = util.promisify(fs.readFile);
const displayNote = util.promisify(fs.writeFile);

class Save {
    display(note) {
        return displayNote('db/db.json', JSON.stringify(note));
    }
    read() {
        return readNote('db/db.json', 'utf8');
    }
    async getNotes() {
        const notes = await this.read();
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
            console.log('notes parsed successfully')
        } catch (err) {
            parsedNotes = [];
            console.log('note parse err?');
        }
        console.log(parsedNotes);
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
        console.log(...notes);
        const updatedNotes = [...notes, newNote];
        this.display(updatedNotes);
        console.log(updatedNotes);
        return newNote;
    }

    async deleteNote(id) {
        const notes = await this.getNotes();
        
        const filteredNotes = notes.filter(note => note.id !== id);
        console.log(note => note.id);
        return this.write(filteredNotes);
    }
}

module.exports = new Save();