import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isWorkbenchRoute = false;
  isEditMode = false;

  constructor(private router: Router) {
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
