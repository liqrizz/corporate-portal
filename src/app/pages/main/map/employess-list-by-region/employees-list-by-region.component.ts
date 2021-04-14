import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '@shared/services/employee.service';
import {Employee, Stat} from '@shared/models/employees';
import {EmployeeFilter} from '@shared/filters/employee-filter';
import {debounce} from '@core/util/decorators';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-employees-list-by-region',
  templateUrl: './employees-list-by-region.component.html',
  styleUrls: ['./employees-list-by-region.component.scss']
})
export class EmployeesListByRegionComponent implements OnInit {
  readonly expand = '...';
  readonly centralItemIndex = 4;
  readonly maxPagItem = 9;
  regionName = 'Загрузка...';
  count = 0;
  pageCount = 0;
  paginationElements: any[];
  employees: Employee[] = [];
  filter: EmployeeFilter;
  cols: any[];
  locationId: number;
  searchControl: FormControl = new FormControl();
  private stats: Stat[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.locationId = Number(this.activatedRoute.snapshot.params.id);
    this.filter = new EmployeeFilter(25, this.locationId);
    this.cols = [
      {field: 'photo', header: '', width: '12rem', noSort: true},
      {field: 'firstName', header: 'ФИО сотрудника'},
      {field: 'department', header: 'Департамент'},
      {field: 'division', header: 'Подразделение'},
      {field: 'position', header: 'Должность'},
      {field: 'contacts', header: 'Контакты'}
    ];
  }

  async ngOnInit(): Promise<void> {
    this.initSearchControl();
    await this.getStats();
    this.getEmployees();
  }

  initSearchControl(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(typing => {
        this.filter.searchCriteria = typing;
        this.getEmployees();
      });
  }

  async getStats(): Promise<void> {
    if (this.employeeService.prevStats.value == null) {
      this.stats = await this.employeeService.statList().toPromise();
      return;
    }

    this.stats = this.employeeService.prevStats.value;
  }

  getEmployees(): void {
    this.employeeService.getEmployees(this.filter).subscribe(data => {
      this.employees = data.items;
      const currentRegion = this.stats.find(item => item.LocationId === Number(this.locationId));
      this.regionName = currentRegion.DisplayName;
      this.count = data.totalRecords;
      this.rewriteArray();
    });
  }

  rewriteArray(): void {
    this.pageCount = Math.trunc(this.count / this.filter.pageSize);
    const stepSize = (this.filter.pageNumber > (this.pageCount - this.centralItemIndex))
      ? this.pageCount - 8
      : this.filter.pageNumber - this.centralItemIndex;

    this.paginationElements = [];
    const iterationCount = this.pageCount < this.maxPagItem ? this.pageCount : this.maxPagItem;
    for (let index = 0; index < iterationCount; index++) {
      if (this.pageCount < this.maxPagItem || index === 0) {
        this.paginationElements.push(index + 1);
        continue;
      }

      if (this.filter.pageNumber <= this.centralItemIndex + 1 && index !== 7) {
        this.paginationElements.push(index === 8 ? this.pageCount : index + 1);
        continue;
      }

      if (this.pageCount !== this.maxPagItem) {
        if (index === 1 || (index === 7 && this.filter.pageNumber < this.pageCount - this.centralItemIndex)) {
          this.paginationElements.push(this.expand);
          continue;
        }
      }

      if (index === 8 && this.pageCount > this.maxPagItem) {
        this.paginationElements.push(this.pageCount);
        continue;
      }

      this.paginationElements.push(stepSize + index);
    }
  }

  @debounce(300) setOffset(offset): void {
    if (offset === this.expand) {
      return;
    }
    this.filter.pageNumber = offset;
    this.getEmployees();
    this.rewriteArray();
  }

  sort(e: {field: string, order: 1 | -1}): void {
    const orders = {firstName: 1, department: 2, division: 3, position: 4, contacts: 5};
    this.filter.sortBy = Number(orders[e.field]);
    this.filter.sortDirection = e.order === 1;
    this.getEmployees();
  }
}
