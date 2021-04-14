import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from '@shared/models/employees';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: Employee): unknown {
    return `${user?.lastName} ${user?.firstName} ${user?.middleName}`;
  }

}
