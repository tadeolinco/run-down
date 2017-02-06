import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    transform(value: string): string {
        let text = '';
        let words = value.split('-');
        for (let i=0; i<words.length; ++i) {
            text += words[i].charAt(0).toUpperCase() + words[i].slice(1);
            if (i<words.length-1) {
                text += ' ';
            }
        }

        return text;
    }

}
