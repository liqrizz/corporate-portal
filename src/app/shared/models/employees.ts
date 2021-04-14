export interface Stat {
  DisplayName: string;
  EmployeesQty: number;
  LocationId: number;
}

export interface Employee {
  id: number;
  photo?: any;
  lastName: string;
  firstName: string;
  middleName: string;
  department: string;
  division: string;
  position: string;
  contacts: string;
}

export interface GetEmployees {
  items: Employee[];
  totalRecords: number;
}
