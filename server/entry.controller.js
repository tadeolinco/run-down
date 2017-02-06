"use strict";
var entry_model_1 = require("./entry.model");
exports.getEntries = function (req, res) {
    entry_model_1["default"].find({}, function (err, entries) {
        if (err)
            throw err;
        return res.json(entries);
    });
};
exports.getEntry = function (req, res) {
    entry_model_1["default"].find({}, function (err, entry) {
        if (err)
            throw err;
        return res.json(entry);
    });
};
exports.createEntry = function (req, res) {
    var newEntry = new entry_model_1["default"]({
        committee: req.body.committee,
        text: req.body.text
    });
    newEntry.save(function (err, entry) {
        if (err)
            throw err;
        return res.json(entry);
    });
};
exports.editEntry = function (req, res) {
    entry_model_1["default"].findById(req.params.id, function (err, entry) {
        if (err)
            throw err;
        entry.text = req.body.text;
        entry.save(function (err, entry) {
            if (err)
                throw err;
            return res.json(entry);
        });
    });
};
exports.removeEntry = function (req, res) {
    entry_model_1["default"].findByIdAndRemove(req.params.id, function (err, entry) {
        if (err)
            throw err;
        return res.json(null);
    });
};
exports.removeEntries = function (req, res) {
    entry_model_1["default"].remove({}, function (err) {
        if (err)
            throw err;
        return res.json(null);
    });
};
