import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './conformation-dialog.component.html',
  styleUrls: ['./conformation-dialog.component.css']
})

// selector: 'confirmation-dialog',
// templateUrl: './confirmation-dialog.html',
export class ConformationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConformationDialogComponent>

  ) { }

  onCancleClick() {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }

}
