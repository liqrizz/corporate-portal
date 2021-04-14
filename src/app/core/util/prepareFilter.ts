import {EmployeeFilter} from '@shared/filters/employee-filter';

export const prepareFilter = <T = EmployeeFilter>(filter: T): StringMap => {
  const params: StringMap = {};

  Object.keys({...filter}).forEach(key => {
    if (filter[key] !== undefined && filter[key] !== null && filter[key] !== '') {
      params[key] = filter[key].toString();
    }
  });

  return params;
};

interface StringMap {
  [key: string]: any;
}
