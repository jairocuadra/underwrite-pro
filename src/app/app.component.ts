import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'underwrite-pro';
  isWorkbenchRoute = false;
  isChatbotRoute = false;
  isEditMode = false;
  darkMode$: Observable<boolean>;
  private routeSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.darkMode$ = this.themeService.darkMode$;
  }

  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isWorkbenchRoute = event.url.includes('underwriting');
      this.isChatbotRoute = event.url.includes('ai-chatbot');
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onEditModeChange(isEdit: boolean): void {
    this.isEditMode = isEdit;
  }
}
