import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ElementsStore } from '../../stores/elements.store';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ElementData } from '../../models/element';
import { ElementEditDialogComponent } from '../element-edit-dialog/element-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './elements-table.component.html',
  styleUrls: ['./elements-table.component.scss'],
})
export class ElementsTableComponent implements OnInit, OnDestroy {
  private store = inject(ElementsStore);
  private dialog = inject(MatDialog);

  displayedColumns = [
    'position',
    'name',
    'weight',
    'symbol'
  ];
  filterInput = '';
  private readonly DEBOUNCE_TIME = 2000;

  private filter$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.store.loadElements();
    this.setupFiltering();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterInput = value;
    this.filter$.next(value);
  }

  onEdit(element: ElementData) {
    const dialogRef = this.dialog.open(ElementEditDialogComponent, {
      data: { ...element },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.updateElement(result);
      }
    });
  }

  private setupFiltering() {
    this.filter$.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      takeUntil(this.destroy$)
    ).subscribe(value => this.store.setFilter(value));
  }

  get filteredElements() {
    return this.store.filteredElements();
  }

  get loading() {
    return this.store.loading();
  }
}
