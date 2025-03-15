import { Component, Inject, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-nda-dialog',
  templateUrl: './nda-dialog.component.html',
  styleUrls: ['./nda-dialog.component.scss']
})
export class NdaDialogComponent implements OnInit {
  isAcknowledged = false;
  isDarkMode = false;

  constructor(
    public dialogRef: MatDialogRef<NdaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ndaContent: string, isDarkMode: boolean },
    private themeService: ThemeService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    // Initialize dark mode from data
    this.isDarkMode = data.isDarkMode;
  }
  
  ngOnInit(): void {
    // Apply dark theme directly to dialog container
    this.applyThemeToDialog();
    
    // Subscribe to theme changes
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.applyThemeToDialog();
    });
  }
  
  // Apply theme directly to dialog container
  private applyThemeToDialog(): void {
    // Get the dialog container
    const dialogContainer = this.elementRef.nativeElement.closest('.mat-dialog-container') || 
                           this.elementRef.nativeElement.closest('.mat-mdc-dialog-container');
    
    if (dialogContainer) {
      if (this.isDarkMode) {
        this.renderer.addClass(dialogContainer, 'dark-theme');
        this.renderer.addClass(dialogContainer, 'dark-theme-dialog');
        this.renderer.setStyle(dialogContainer, 'background-color', '#2d2d2d');
        this.renderer.setStyle(dialogContainer, 'color', '#e0e0e0');
      } else {
        this.renderer.removeClass(dialogContainer, 'dark-theme');
        this.renderer.removeClass(dialogContainer, 'dark-theme-dialog');
        this.renderer.removeStyle(dialogContainer, 'background-color');
        this.renderer.removeStyle(dialogContainer, 'color');
      }
    }
    
    // Apply theme to dialog title and content
    const dialogTitle = this.elementRef.nativeElement.querySelector('.mat-dialog-title') ||
                       this.elementRef.nativeElement.querySelector('.mat-mdc-dialog-title');
    
    if (dialogTitle) {
      if (this.isDarkMode) {
        this.renderer.setStyle(dialogTitle, 'color', '#e0e0e0');
      } else {
        this.renderer.removeStyle(dialogTitle, 'color');
      }
    }
    
    const dialogContent = this.elementRef.nativeElement.querySelector('.mat-dialog-content') ||
                         this.elementRef.nativeElement.querySelector('.mat-mdc-dialog-content');
    
    if (dialogContent) {
      if (this.isDarkMode) {
        this.renderer.setStyle(dialogContent, 'color', '#e0e0e0');
      } else {
        this.renderer.removeStyle(dialogContent, 'color');
      }
    }
  }

  acknowledge(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
} 