import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementData } from '../../models/element';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-element-edit-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  template: `
    <h3 mat-dialog-title>Edit Element</h3>
    <div mat-dialog-content class="edit-dialog">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Weight</mat-label>
        <input matInput type="number" [(ngModel)]="data.weight" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Symbol</mat-label>
        <input matInput [(ngModel)]="data.symbol" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-button color="primary" (click)="dialogRef.close(data)">Save</button>
    </div>
  `,
  styleUrls: ['./element-edit-dialog.component.scss']
})
export class ElementEditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ElementData,
    public dialogRef: MatDialogRef<ElementEditDialogComponent>
  ) {}
}
