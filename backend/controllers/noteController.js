const asyncHandler = require("express-async-handler");

const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
    
  const notes = await Note.find({ user: req.user._id });
  res.send(notes);

});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);

    throw new Error("PLease Fill All The Feilds");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note Not Found In Database" });
  }
});


const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    //> here we are not useing Note model becz its for crearting-- for updating we need to use the note which is getting from the findById

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(400);

    throw new Error("Note Not Found");
  }
});


const deleteNote= asyncHandler(async(req,res)=>{

    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        throw new Error("You can't perform this action");
      }


      if(note){
        await note.remove();
        res.json({message:'Note Removed'})
      }else{
        res.status(400);

        throw new Error("Note Not Found");

      }
})


module.exports = { getNoteById, getNotes, createNote,updateNote,deleteNote };
