import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import Entry from './entry';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    private url: string;

    constructor(private http: Http) {
        this.url = window.location.href + 'api/entry';
    }

    getAll(): Observable<Entry[]> {
        return this.http
            .get(this.url)
            .map(response => {
                return response.json();
            });
    }

    get(id: string | number): Observable<Entry> {
        return this.http
            .get(`${this.url}/${id}`)
            .map(response => {
                return response.json();
            });
    }

    create(body: Object): Observable<Entry> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(this.url, bodyString, options)
            .map(response => {
                return response.json();
            });
    }

    update(id: string, text: string): Observable<Entry> {


        return this.http
            .put(`${this.url}/${id}`, { text: text })
            .map((res: Response) => {
                return res.json();
            });
    }

    remove(id: string): Observable<Entry> {
        return this.http
            .delete(`${this.url}/${id}`)
            .map((res: Response) => {
                return res.json();
            });
    }

}
