import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import Entry from './entry.model';
import * as EntryCtrl from './entry.controller';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/../dist'));
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/run-down', err => {
    if (err) console.log('Error connecting to database');
    else console.log('Success in connecting to database');
});

let viewers = [];
let editors = [];
let count = 0;
io.on('connection', socket => {
    count++;
    console.log(`[${count}] User connected`);

    socket.on('set user type', (userType: string) => {
        if (userType === 'view') {
            console.log(`[${socket.id}] User is now a viewer`)
            viewers.push(socket.id);
        } else {
            console.log(`[${socket.id}] User is now an editor`)
            editors.push(socket.id);
        }
    });

    socket.on('editor change', (committee: string, text: string) => {
        for (let id of viewers) {
            io.sockets.sockets[id].emit('server change', committee, text);
        }
    });

    socket.on('disconnect', () => {
        count--;
        console.log(`[${count}] User disconnected`); 
        viewers = viewers.filter(id => id !== socket.id);
        editors = editors.filter(id => id !== socket.id);
    });
});


app.get     ('/api/entry',      EntryCtrl.getEntries);
app.get     ('/api/entry/:id',  EntryCtrl.getEntry);
app.post    ('/api/entry',      EntryCtrl.createEntry);
app.put     ('/api/entry/:id',  EntryCtrl.editEntry);
app.delete  ('/api/entry/:id',  EntryCtrl.removeEntry);
app.delete  ('/api/entry',      EntryCtrl.removeEntries);

app.get('*', (req, res) => {
    res.sendFile('index.html');
});

require('./seed.js');

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
