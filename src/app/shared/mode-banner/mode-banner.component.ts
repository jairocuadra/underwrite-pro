import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mode-banner',
  templateUrl: './mode-banner.component.html',
  styleUrls: ['./mode-banner.component.scss']
})
export class ModeBannerComponent {
  @Input() isEditMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  toggleEditMode() {
    if (!this.isEditMode) {
      // Will implement dialog opening here
      this.editModeChange.emit(true);
    } else {
      // Will implement exit edit mode logic here
      this.editModeChange.emit(false);
    }
  }
} 