import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CapitalizePipe } from './capitalize/capitalize.pipe';
import { EntryService } from './entry/entry.service';

@NgModule({
    declarations: [
        AppComponent,
        CapitalizePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        EntryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
