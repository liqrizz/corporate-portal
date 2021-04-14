import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {EmployeeService} from '@shared/services/employee.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') test: ElementRef;
  ctx: any;
  sampleMap = new Map();
  totalEmployeesCount = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private employeeService: EmployeeService
  ) {
  }

  ngAfterViewInit(): void {
    this.employeeService.statList().subscribe(data => {
      this.totalEmployeesCount = 0;
      data.forEach(item => {
        this.totalEmployeesCount += item.EmployeesQty;
        this.sampleMap.set(item.LocationId, item.DisplayName);
        this.setText('locationId_' + item.LocationId, item.EmployeesQty > 0 ? '#37AF5F' : '#de1111', item.EmployeesQty);
      });
    });
    this.ctx = this.test.nativeElement;

    this.ctx.addEventListener('click', e => {
      const branch = e.target.dataset.branch;
      if (branch) {
        this.router.navigate([`main/map/employees/${Number(e.target.dataset.branch)}`]).then();
      }
    });
  }

  rectSetting(rect, SVGRect, fill, id = null, branchId = null): any {
    rect.setAttribute('x', SVGRect.x - 7);
    rect.setAttribute('y', SVGRect.y - 2.5);
    rect.setAttribute('rx', 7);
    if (id !== null) {
      rect.setAttribute('id', 'rect_' + id);
    }
    rect.setAttribute('ry', 7);
    rect.setAttribute('data', 7);

    if (branchId) {
      rect.setAttribute('data-branch', branchId);
      rect.setAttribute('class', 'clickable');
    }

    rect.setAttribute('width', SVGRect.width + 14);
    rect.setAttribute('height', SVGRect.height + 5);
    rect.setAttribute('fill', fill);
    return rect;
  }

  getCompensation(text): number {
    const letterWidth = 5;
    const len = String(text).length - 1;
    return len * letterWidth;
  }

  setText(id, fill, text): void {
    const ctx = this.ctx;
    const textElm = ctx.getElementById(id);
    let branchId = null;

    if (Array.from(textElm.classList).includes('clickable')) {
      branchId = textElm.dataset.branch;
    }

    const dataX = textElm.dataset ? textElm.dataset.defaultX : null;
    textElm.textContent = '0';

    const defaultX = dataX || textElm.getBBox().x; // 0/0
    textElm.dataset.defaultX = defaultX;

    textElm.textContent = text;
    textElm.setAttribute('x', defaultX - this.getCompensation(text));

    const SVGRect = textElm.getBBox();
    const oldRect = ctx.getElementById('rect_' + id);

    if (oldRect) {
      this.rectSetting(oldRect, SVGRect, fill, null, branchId);
      return;
    }

    const rawRect = this.document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const rect = this.rectSetting(rawRect, SVGRect, fill, id, branchId);
    ctx.insertBefore(rect, textElm);
  }
}
