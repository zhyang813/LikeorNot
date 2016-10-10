var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  text: String,
  ups: Number,
  downs: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Qs', questionSchema);;