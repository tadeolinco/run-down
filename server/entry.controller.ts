import Entry from './entry.model';
import { Request, Response } from 'express';

export const getEntries = (req: Request, res: Response) => {
    Entry.find({}, (err, entries) => {
        return res.json(entries);
    });
}

export const getEntry = (req: Request, res: Response) => {
    Entry.find({}, (err, entry) => {
        return res.json(entry);
    });
}

export const createEntry = (req: Request, res: Response) => {
    let newEntry = new Entry({
        committee: req.body.committee,
        text: req.body.text
    });

    newEntry.save((err, entry) => {
        return res.json(entry);
    });
}

export const editEntry = (req: Request, res: Response) => {
    Entry.findById(req.params.id, (err, entry) => {

        entry.text = req.body.text;

        entry.save((err, entry) => {

            return res.json(entry);
        })
    });
};

export const removeEntry = (req: Request, res: Response) => {
    Entry.findByIdAndRemove(req.params.id, (err, entry) => {
        return res.json(null);
    });
}

export const removeEntries = (req: Request, res: Response) => {
    Entry.remove({}, err => {
        return res.json(null);
    });
}