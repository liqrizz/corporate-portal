import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'semantic'
})
export class SemanticPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toLowerCase().includes('город')) {
      return value.replace(/([гГ])ород/, 'городу');
    }

    if (value.toLowerCase().includes('область')) {
      return value
        .replace(/ая/, 'ой')
        .replace(/область/, 'области');
    }

    return value;
  }

}
