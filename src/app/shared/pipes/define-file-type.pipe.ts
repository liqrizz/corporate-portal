import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'defineFileType'
})
export class DefineFileTypePipe implements PipeTransform {
  fileTypeMaps = {
    'Документ Microsoft Word': 'word.svg',
    'Презентация PowerPoint': 'ppt.svg',
    'Книга Microsoft Excel': 'xlsx.svg',
    'Документ PDF': 'pdf.svg'
  };

  transform(value: string): string {
    return this.fileTypeMaps[value];
  }

}
