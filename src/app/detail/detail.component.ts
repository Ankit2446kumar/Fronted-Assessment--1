import { Component, Input } from '@angular/core';
import { Employee } from '../app.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() employee?: Employee;
}
