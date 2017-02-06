"use strict";
var mongoose = require("mongoose");
exports.EntrySchema = new mongoose.Schema({
    committee: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});
var Entry = mongoose.model('Entry', exports.EntrySchema);
exports.__esModule = true;
exports["default"] = Entry;
