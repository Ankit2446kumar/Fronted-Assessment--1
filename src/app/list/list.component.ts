import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../app.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() employees: Employee[] = [];
  @Output() selectEmployee = new EventEmitter<Employee>();

  onRowClick(emp: Employee) {
    this.selectEmployee.emit(emp);
  }
}
