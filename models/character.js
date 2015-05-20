var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({
    name: String,
    class: String,
    str: Number,
    dex: Number,
    con: Number,
    inte: Number,
    wis: Number,
    cha: Number
});

module.exports = mongoose.model('Characters', CharacterSchema);
