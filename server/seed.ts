import Entry from './entry.model';

Entry.find({}, (err, entries) => {
    if (err) throw err;

    let committees = [
        'over-all',
        'finance',
        'secretariat',
        'promotions',
        'technicals',
        'visuals',
        'programs'
    ];

    committees = committees.filter(committee => {
        let absent = true;
        for (let entry of entries) {
            if (entry.committee === committee) {
                absent = false;
            }
        }
        return absent;
    });

    for (let committee of committees) {
        let newEntry = new Entry({
            committee: committee,
            text: `# ${committee}`
        });
        newEntry.save((err, entry) => {
            if (err) throw err;
            console.log(`Created committee: ${committee}`);
        });
    }

    

});
