import mongoose from "mongoose";
import NoteModel from "../models/note.js";
import createHttpError from "http-errors";

export const getNotes = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, "Note not found");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) throw createHttpError(400, "Note must have a title");

    const newNote = await NoteModel.create({
      title,
      text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid note id");

    if (!title) throw createHttpError(400, "Note must have title");

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, "Note not found");

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, "Note not found");

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
