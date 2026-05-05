const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    unique: true,
    trim: true
},
description: {
    type: String,
    required: true,
    trim: true
},
genre: {
    type: String,
    required: true,
    trim: true
},
releaseYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  director: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);