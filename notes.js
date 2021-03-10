const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

//Function to add the note
const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)

    //Code to check whether the title of the notes are the same
    if(duplicateNote){
        console.log("Duplicate title!!")
    }else{
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    }
}

//Function to save/write the JSON data to notes.json file
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

//Function to remove note
const removeNote = function(title){
    const notes = loadNotes()
    const notSearchedNote = notes.filter((note)=>{
        return note.title !== title
    })

    if(notSearchedNote.length === notes.length){
        console.log(chalk.red.inverse("Searched note not found!"))
    }else{
        console.log(chalk.green.inverse("Note Removed!"))
        saveNotes(notSearchedNote)
    }
}

const loadNotes = function () {
    //Tries to read data from the JSON file and parses it into JS object
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e) {
        //Returns empty array if file hasn't been created previously
        return []
    }
}

//List notes function
const listNotes = function(){
    const notes = loadNotes()
    console.log(chalk.magenta.inverse("Your Notes..."))
    notes.forEach(note => {
        console.log(chalk.green.inverse(note.title))
    });
}


//Readnote function
const readNote = function(title){
    const notes = loadNotes()
    // const filteredNote = notes.find((note)=> note.title === title)
    const filteredNote = notes.find((note)=> note.title === title)
    if(filteredNote){
        // console.log(filteredNote)
        console.log(chalk.bgMagenta(filteredNote.title))
        console.log(filteredNote.body)
    }else{
        console.log(chalk.red("Note not found!"))
    }
}

//Exporting all the functions

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}