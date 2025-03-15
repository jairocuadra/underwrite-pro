import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nda-dialog',
  templateUrl: './nda-dialog.component.html',
  styleUrls: ['./nda-dialog.component.scss']
})
export class NdaDialogComponent {
  isAcknowledged = false;

  constructor(
    public dialogRef: MatDialogRef<NdaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ndaContent: string }
  ) {}

  acknowledge(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
} 