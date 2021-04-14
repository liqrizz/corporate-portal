import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Employee} from '@shared/models/employees';
import {EmployeeService} from '@shared/services/employee.service';
import {EmployeeFilter} from '@shared/filters/employee-filter';
import {FormControl} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-select-user-overlay',
  templateUrl: './select-user-overlay.component.html',
  styleUrls: ['./select-user-overlay.component.scss']
})
export class SelectUserOverlayComponent implements OnInit, OnDestroy {
  users: Employee[];
  filter = new EmployeeFilter(10000);
  searchControl: FormControl = new FormControl();
  usersSelectedMap: any;
  private destroy$: Subject<boolean> = new Subject();

  constructor(public ref: DynamicDialogRef,
              private employeeService: EmployeeService,
              private config: DynamicDialogConfig) {
    this.usersSelectedMap = config.data.usersSelectedMap;
    console.log('ASD ', this.usersSelectedMap);
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.searchControl.valueChanges
      .pipe(debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.filter.searchCriteria = res;
        this.loadEmployees();
      });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(this.filter)
      .subscribe(res => {
        // this.users = res.items;
        this.users = [
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Cббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Cббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Cббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Cббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Cббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Tббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Бббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Qббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
          {lastName: 'Pббббббвабва', middleName: 'Midle', firstName: 'firtsnasdasd'} as Employee,
        ];
        this.users.sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        });
      });
  }

  onSubmit(): void {
    this.ref.close(this.usersSelectedMap);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelectUser($event: any, userId): void {
    this.usersSelectedMap[userId] = $event.checked;
  }
}
