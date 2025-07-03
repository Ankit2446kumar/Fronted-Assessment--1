import { Component } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  age: number;
}

@Component({
  selector: 'app-root',
  template: `
    <h1>Employee Management</h1>
    <app-list 
      [employees]="employees" 
      (selectEmployee)="onSelectEmployee($event)">
    </app-list>

    <app-detail 
      *ngIf="selectedEmployee" 
      [employee]="selectedEmployee">
    </app-detail>
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: 20px; }
  `]
})
export class AppComponent {
  employees: Employee[] = [
    { id: 1, name: 'Anuj', department: 'HR', salary: 50000, age: 30 },
    { id: 2, name: 'Aman', department: 'IT', salary: 60000, age: 25 },
    { id: 3, name: 'Ashish', department: 'Finance', salary: 70000, age: 35 },
    { id: 4, name: 'Divya', department: 'Marketing', salary: 55000, age: 28 },
    { id: 5, name: 'Swati', department: 'Operations', salary: 52000, age: 32 }
  ];

  selectedEmployee?: Employee;

  onSelectEmployee(emp: Employee) {
    this.selectedEmployee = emp;
  }
}
