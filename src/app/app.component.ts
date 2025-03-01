import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isWorkbenchRoute = false;
  isEditMode = false;
  darkMode$: Observable<boolean>;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.darkMode$ = this.themeService.darkMode$;
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isWorkbenchRoute = event.url.includes('/workbench');
    });
  }

  onEditModeChange(enabled: boolean) {
    this.isEditMode = enabled;
  }
}
