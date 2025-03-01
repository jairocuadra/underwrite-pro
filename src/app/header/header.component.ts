import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSelect(route: string) {
    this.router.navigate([`/${route}`]);
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
