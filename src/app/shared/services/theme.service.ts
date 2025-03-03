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
    // Apply to body for global styles
    if (isDark) {
      document.body.classList.add('dark-theme');
      // Apply to overlay container
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      // Set a CSS variable to help with transitions
      document.documentElement.style.setProperty('--is-dark-theme', '1');
    } else {
      document.body.classList.remove('dark-theme');
      // Remove from overlay container
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      // Set a CSS variable to help with transitions
      document.documentElement.style.setProperty('--is-dark-theme', '0');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#111827' : '#ffffff');
    }
  }
} 