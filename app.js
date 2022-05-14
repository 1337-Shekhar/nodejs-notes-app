// const chalk = require('chalk')
import yargs from 'yargs'
import * as notesUtil from './notes.js'
// import chalk from 'chalk'
// import yargs from 'yargs'
// import notesUtil from './notes.js'
const yarg = yargs(process.argv.slice(2))
yarg.command({
    command:'add',
    describe:'Adds a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notesUtil.addNote(argv.title, argv.body)
    }
})

yarg.command({
    command:'remove',
    describe:'Removes a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notesUtil.removeNote(argv.title)
    }
})

yarg.command({
    command:'list',
    describe:'List all the notes',
    handler(){
        notesUtil.listNotes()
    }
})

yarg.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notesUtil.readNote(argv.title)
    }
})

yarg.parse()