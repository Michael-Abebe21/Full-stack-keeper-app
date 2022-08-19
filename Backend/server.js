const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/NotesDB");
const Note = require("./models/Note");
const {text, json} = require("express");



app.get('/note', async (req, res) => {
    const note = await Note.find(); 

    res.json(note); 
})

app.post('/note/new', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })

    note.save();

    res.json(note)
})

app.delete('/note/delete/:id', async (req, res) => {
    const result = await Note.findByIdAndDelete(req.params.id);


    res.json(result);
})

app.listen(3001, () => console.log("Server is live on port 3001"));