import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uwp-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() label?: string;
  @Input() labelFor?: string;
  @Input() helperText?: string;
  @Input() errorText?: string;
  @Input() required = false;
  @Input() fullWidth = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  get formFieldClasses(): string {
    return `
      uwp-form-field
      ${this.fullWidth ? 'uwp-form-field-full-width' : ''}
      ${this.disabled ? 'uwp-form-field-disabled' : ''}
      ${this.errorText ? 'uwp-form-field-error' : ''}
    `;
  }
}
