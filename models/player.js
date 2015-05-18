var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    str: Number,
    dex: Number,
    con: Number,
    inte: Number,
    wis: Number,
    cha: Number
});

module.exports = mongoose.model('Players', PlayerSchema);