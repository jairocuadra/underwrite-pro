import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uwp-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'success' | 'warning' | 'error' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() toggleChange = new EventEmitter<boolean>();
  
  private _checked = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  
  get checked(): boolean {
    return this._checked;
  }
  
  @Input()
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.onChange(value);
      this.toggleChange.emit(value);
    }
  }
  
  get toggleClasses(): string {
    return `
      uwp-toggle
      uwp-toggle-${this.color}
      uwp-toggle-${this.size}
      ${this.checked ? 'uwp-toggle-checked' : ''}
      ${this.disabled ? 'uwp-toggle-disabled' : ''}
      uwp-toggle-label-${this.labelPosition}
    `;
  }
  
  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onTouched();
    }
  }
  
  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this._checked = value;
  }
  
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
