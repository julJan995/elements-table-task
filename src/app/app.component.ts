import { Component } from '@angular/core';
import { ElementsTableComponent } from './components/elements-table/elements-table.component';

@Component({
  selector: 'app-root',
  imports: [
    ElementsTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appName = 'Elements Table';
}
