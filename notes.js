import fs from 'fs'
// import fs from 'fs'
import chalk from 'chalk'

const orange = chalk.hex('#FFA500');

const getNotes = () => {
    try{
        const readBuffer = fs.readFileSync('note-json.json')
        const readResult = readBuffer.toString()
        return JSON.parse(readResult)
    }catch(exception){
        console.log(chalk.yellow.inverse('JSON file not found. Creating empty JSON file!'))
        fs.writeFileSync('note-json.json','')
        return []
    }
}

const saveNote = (notes) => {
    const writeResult = JSON.stringify(notes)
    fs.writeFileSync('note-json.json',writeResult)
}

const addNote = (title,body) => {
    const notes = getNotes()
    //const duplicateNotes = notes.filter((note)=> note.title===title) //Commented because it will filter through all the notes present whereas we need to stop even if one not duplicate is found
    const duplicateNote = notes.find((note) => note.title === title )
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNote(notes)
        console.log(chalk.blue.inverse('Note Added!'))
    }else{
        console.log(chalk.yellow.inverse('Note title already taken!'))
    }
}

const removeNote = (title) => {
    const notes = getNotes()
    const findNote = notes.filter((note)=> note.title===title)
    if(findNote.length===0){
        console.log(chalk.yellow.inverse('Note not found. Nothing removed!'))
    }else{
        const noteRemoved = notes.splice(notes.findIndex((note)=> findNote.includes(note)))
        saveNote(notes)
        console.log(orange.inverse('Note removed with the following title and body:'))
        noteRemoved.array.forEach(element => console.log(JSON.stringify(element)));
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('List of all notes:'))
    getNotes().forEach(element=>console.log(element.title))
}

const readNote = (title) => {
    const note = getNotes().find((note) => note.title === title)
    if(note){
        console.log(chalk.inverse('Title')+':'+note.title)
        console.log('Body:'+note.body)
    }else{
        console.log(chalk.yellow.inverse('Note not found!'))
    }
}

export{addNote, removeNote, listNotes, readNote}