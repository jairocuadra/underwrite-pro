import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  darkMode$: Observable<boolean>;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.darkMode$ = this.themeService.darkMode$;
  }

  ngOnInit(): void {}

  onSelect(route: string) {
    this.router.navigate([`/${route}`]);
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
