import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';
import { ThemeService } from '../services/theme.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mode-banner',
  templateUrl: './mode-banner.component.html',
  styleUrls: ['./mode-banner.component.scss']
})
export class ModeBannerComponent {
  @Input() isEditMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private themeService: ThemeService
  ) {}

  toggleEditMode() {
    if (!this.isEditMode) {
      // Open the edit mode dialog
      this.themeService.darkMode$.pipe(take(1)).subscribe(isDarkMode => {
        const dialogRef = this.dialog.open(EditModeModalComponent, {
          width: '500px',
          panelClass: isDarkMode ? ['edit-mode-dialog-panel', 'dark-theme'] : 'edit-mode-dialog-panel',
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // User submitted the form
            this.editModeChange.emit(true);
            console.log('Edit mode enabled with data:', result);
          }
        });
      });
    } else {
      // Exit edit mode
      this.editModeChange.emit(false);
    }
  }
} 