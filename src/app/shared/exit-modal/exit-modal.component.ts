import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ExitModalData {
  scenario: 'all_completed' | 'incomplete' | 'empty';
}

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.scss']
})
export class ExitModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExitModalData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getTitle(): string {
    switch (this.data.scenario) {
      case 'all_completed':
        return 'Ready for Final Decision';
      case 'incomplete':
        return 'Incomplete Work Items Alert';
      case 'empty':
        return 'Confirm Exit';
      default:
        return 'Confirm Exit';
    }
  }

  getBody(): string {
    switch (this.data.scenario) {
      case 'all_completed':
        return `You are about to exit. Any additional windows will close automatically.

This case is ready for a final decision.

Have you completed all possible tasks within the policy(s) in this application?`;
      case 'incomplete':
        return `You are about to exit. Any additional windows will close automatically.

Incomplete Work Items Alert:
- You have not completed all required tasks.
- Pending work items must be addressed before a final decision can be made.
- If no action is taken within the required timeframe, pending items will automatically move to "Action Needed."

Have you completed all possible tasks within the policy(s) in this application?`;
      case 'empty':
        return `You are about to exit. Any additional windows will close automatically.

There are currently no tasks pending or completed in the workboard.

Have you verified that there are no additional tasks required for this application?`;
      default:
        return '';
    }
  }

  isHighlighted(): boolean {
    return this.data.scenario === 'all_completed' || this.data.scenario === 'incomplete';
  }
} 