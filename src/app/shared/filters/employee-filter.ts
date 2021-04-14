export class EmployeeFilter {
  locationId: number;
  searchCriteria: string;
  sortBy: number;
  sortDirection = true;
  pageNumber: number;
  pageSize: number;

  constructor(pageSize: number, locationId?: number) {
    this.pageNumber = 1;
    this.pageSize = pageSize;
    this.locationId = locationId;
  }
}
