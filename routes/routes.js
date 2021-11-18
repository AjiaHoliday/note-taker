const router = require("express").Router();
const { findById, createNewNote } = require("../lib/note");
const { notes } = require("../db/db.json");

