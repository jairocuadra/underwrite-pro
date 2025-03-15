import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeKey = 'darkMode';
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialDarkModeState());
  
  darkMode$ = this.darkModeSubject.asObservable();

  constructor(private overlayContainer: OverlayContainer) {
    // Apply the initial theme
    this.applyTheme(this.darkModeSubject.value);
    
    // Listen for system preference changes
    this.listenForSystemPreferenceChanges();
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem(this.darkModeKey, JSON.stringify(newValue));
    this.applyTheme(newValue);
  }

  private getInitialDarkModeState(): boolean {
    // Check if user has a saved preference
    const savedPreference = localStorage.getItem(this.darkModeKey);
    if (savedPreference !== null) {
      return JSON.parse(savedPreference);
    }
    
    // Otherwise, use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private listenForSystemPreferenceChanges(): void {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only update if user hasn't set a preference
        if (localStorage.getItem(this.darkModeKey) === null) {
          this.darkModeSubject.next(e.matches);
          this.applyTheme(e.matches);
        }
      });
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
      // Make sure to add the class to the overlay container
      const overlayElement = this.overlayContainer.getContainerElement();
      overlayElement.classList.add('dark-theme');
      
      // Add specific class for menus
      overlayElement.classList.add('dark-theme-menu');
      
      // Update meta theme color for mobile browsers
      this.updateMetaThemeColor('#121212'); // Dark background color
    } else {
      document.body.classList.remove('dark-theme');
      // Make sure to remove the class from the overlay container
      const overlayElement = this.overlayContainer.getContainerElement();
      overlayElement.classList.remove('dark-theme');
      overlayElement.classList.remove('dark-theme-menu');
      
      // Update meta theme color for mobile browsers
      this.updateMetaThemeColor('#f5f7fa'); // Light background color
    }
    
    // Store the user's preference
    localStorage.setItem(this.darkModeKey, String(isDark));
  }

  private updateMetaThemeColor(color: string): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }
} 