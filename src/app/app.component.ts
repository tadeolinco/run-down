import { Component, OnInit } from '@angular/core';
import { EntryService } from './entry/entry.service';
import Entry from './entry/entry';
import * as io from 'socket.io-client';
import * as MarkdownIt from 'markdown-it';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    userType = '';
    entry: Entry;
    socket: SocketIOClient.Socket;
    md: MarkdownIt.MarkdownIt;
    entries: Entry[] = [];
    committees = [
        'over-all',
        'secretariat',
        'finance',
        'technicals',
        'programs',
        'visuals',
        'promotions'
    ];

    constructor(private entryService: EntryService) {
        this.entry = {
            committee: 'over-all',
            text: ''
        };
    }

    editorChange(text) {
        this.socket.emit('editor change', this.entry.committee, text);
    }

    viewerChange(text) {
        $('#view-md').empty();
        $('#view-md').append(this.md.render(text));
    }

    ngOnInit() {
        this.md = new MarkdownIt();
        this.socket = io(window.location.href);

        this.socket.on('server change', (committee, text) => {
            if (this.userType === 'view' && committee === this.entry.committee) {
                this.viewerChange(text);
            }
        }); 


        this.entryService.getAll()
            .subscribe(entries => {
                this.entries = entries;
                this.changeCommittee(this.entry.committee);
                this.viewerChange(this.entry.text);
            });
        
    }

    changeCommittee(committee) {
        if (this.userType === 'view') {
            this.entryService.getAll()
                .subscribe(entries => {
                    this.entries = entries;
                    for (let entry of entries) {
                        if (entry.committee === committee) {
                            console.log(`Committee changed to: ${committee}`);
                            this.entry = entry;
                            this.viewerChange(entry.text);
                            break;
                        }
                    }
                });
        } else {
            for (let entry of this.entries) {
                if (entry.committee === committee) {
                    console.log(`Committee changed to: ${committee}`);
                    this.entry = entry;
                    break;
                }
            }
        }
    }

    setUserType(userType) {
        this.userType = userType;
        this.socket.emit('set user type', userType);
        if (this.userType === 'view') {
            this.viewerChange(this.entry.text);
        } else {
            setInterval(() => {
                for (let entry of this.entries) {
                    this.entryService
                        .update(entry._id, entry.text || `# ${entry.committee}`)
                        .subscribe(entry => {
                            console.log(`${entry.committee} entry saved!`);
                        });
                }
            }, 10000);
        }
    }
}
