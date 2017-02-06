"use strict";
var entry_model_1 = require("./entry.model");
entry_model_1["default"].find({}, function (err, entries) {
    if (err)
        throw err;
    var committees = [
        'over-all',
        'finance',
        'secretariat',
        'promotions',
        'technicals',
        'visuals',
        'programs'
    ];
    committees = committees.filter(function (committee) {
        var absent = true;
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            if (entry.committee === committee) {
                absent = false;
            }
        }
        return absent;
    });
    var _loop_1 = function (committee) {
        var newEntry = new entry_model_1["default"]({
            committee: committee,
            text: "# " + committee
        });
        newEntry.save(function (err, entry) {
            if (err)
                throw err;
            console.log("Created committee: " + committee);
        });
    };
    for (var _i = 0, committees_1 = committees; _i < committees_1.length; _i++) {
        var committee = committees_1[_i];
        _loop_1(committee);
    }
});
