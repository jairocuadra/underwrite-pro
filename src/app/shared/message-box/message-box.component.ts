import { Component, Input, OnInit } from '@angular/core';

export type MessageType = 'info' | 'warning' | 'error' | 'success';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  @Input() type: MessageType = 'info';
  @Input() icon: string | null = null;
  @Input() title: string | null = null;
  @Input() showIcon = true;

  constructor() { }

  ngOnInit(): void {
    if (!this.icon) {
      this.icon = this.getDefaultIcon();
    }
  }

  private getDefaultIcon(): string {
    switch (this.type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'success':
        return 'check_circle';
      default:
        return 'info';
    }
  }
}
