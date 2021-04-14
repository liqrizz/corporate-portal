import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initialName'
})
export class InitialNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const names = value.split(' ');
    return `${names[1]} ${names[0][0]}.${names[2][0]}.`;
  }

}
