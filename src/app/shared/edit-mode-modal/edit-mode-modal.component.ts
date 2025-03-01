import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface EditModeData {
  role: string;
  reason: string;
  comments: string;
}

@Component({
  selector: 'app-edit-mode-modal',
  templateUrl: './edit-mode-modal.component.html',
  styleUrls: ['./edit-mode-modal.component.scss']
})
export class EditModeModalComponent {
  editForm: FormGroup;
  roles = [
    { value: 'underwriter', label: 'Underwriter' },
    { value: 'case_manager', label: 'Case Manager' },
    { value: 'supervisor', label: 'Supervisor' }
  ];

  reasons = [
    { value: 'review', label: 'Case Review' },
    { value: 'update', label: 'Update Information' },
    { value: 'approve', label: 'Approval Process' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditModeModalComponent>
  ) {
    this.editForm = this.fb.group({
      role: ['', Validators.required],
      reason: ['', Validators.required],
      comments: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  getCharacterCount(): number {
    return this.editForm.get('comments')?.value?.length || 0;
  }
} 