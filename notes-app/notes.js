const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added");
  } else {
    console.log("Note title taken");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const updatedNotes = notes.filter((note) => note.title !== title);

  if (notes.length === updatedNotes.length) {
    console.log(chalk.red.inverse("No note found"));
  } else {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(updatedNotes);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.bold("Your notes:"));
  notes.forEach((note) => console.log(chalk.blue(note.title)));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
