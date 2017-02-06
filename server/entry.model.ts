import * as mongoose from 'mongoose';

export interface IEntry extends mongoose.Document {
    committee: string,
    text: string
}

export const EntrySchema = new mongoose.Schema({
    committee: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Entry = mongoose.model<IEntry>('Entry', EntrySchema);
export default Entry;
