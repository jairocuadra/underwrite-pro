# Underwrite Pro UI Component Library

A shared component library for the Underwrite Pro application.

## Components

### Card Component

A versatile card component for displaying content in a contained format.

```html
<uwp-card 
  title="Card Title" 
  [subtitle]="Optional subtitle"
  [elevation]="'low' | 'medium' | 'high'"
  [padding]="'small' | 'medium' | 'large'"
  [noBorder]="true | false">
  
  <!-- Card content goes here -->
  <p>This is the card content.</p>
  
</uwp-card>
```

### Section Title Component

A component for creating consistent section titles throughout the application.

```html
<uwp-section-title 
  title="Section Title" 
  [subtitle]="Optional subtitle"
  [color]="'primary' | 'accent' | 'default'"
  [withDivider]="true | false">
</uwp-section-title>
```

### Button Component

A customizable button component with various styles and states.

```html
<uwp-button 
  label="Button Label" 
  [type]="'button' | 'submit' | 'reset'"
  [variant]="'primary' | 'secondary' | 'outline' | 'text'"
  [size]="'small' | 'medium' | 'large'"
  [icon]="'icon-name'"
  [iconPosition]="'left' | 'right'"
  [fullWidth]="true | false"
  [disabled]="true | false"
  [loading]="true | false"
  (buttonClick)="handleClick($event)">
  
  <!-- Optional icon content -->
  <mat-icon icon-left>home</mat-icon>
  
</uwp-button>
```

### Badge Component

A badge component for displaying status, labels, or counts.

```html
<uwp-badge 
  text="Badge Text" 
  [variant]="'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'"
  [size]="'small' | 'medium' | 'large'"
  [rounded]="true | false"
  [outlined]="true | false"
  [icon]="'icon-name'">
  
  <!-- Optional icon content -->
  <mat-icon badge-icon>check</mat-icon>
  
</uwp-badge>
```

### Form Field Component

A form field wrapper component for consistent form styling.

```html
<uwp-form-field 
  label="Field Label" 
  [labelFor]="'input-id'"
  [helperText]="'Helper text goes here'"
  [errorText]="formControl.errors ? 'Error message' : null"
  [required]="true | false"
  [fullWidth]="true | false"
  [disabled]="true | false">
  
  <!-- Input element goes here -->
  <input id="input-id" type="text">
  
</uwp-form-field>
```

### Toggle Component

A toggle switch component for boolean inputs.

```html
<uwp-toggle 
  label="Toggle Label" 
  [checked]="true | false"
  [labelPosition]="'left' | 'right'"
  [color]="'primary' | 'accent' | 'success' | 'warning' | 'error'"
  [size]="'small' | 'medium' | 'large'"
  [disabled]="true | false"
  (toggleChange)="handleToggleChange($event)">
</uwp-toggle>
```

### Checkbox Component

A checkbox component for boolean inputs.

```html
<uwp-checkbox 
  label="Checkbox Label" 
  [checked]="true | false"
  [indeterminate]="true | false"
  [labelPosition]="'left' | 'right'"
  [color]="'primary' | 'accent' | 'success' | 'warning' | 'error'"
  [size]="'small' | 'medium' | 'large'"
  [disabled]="true | false"
  (checkboxChange)="handleCheckboxChange($event)">
</uwp-checkbox>
```

## Installation

To use this library in your Angular project:

1. Import the `UnderwriteProUiModule` in your app module:

```typescript
import { UnderwriteProUiModule } from 'underwrite-pro-ui';

@NgModule({
  imports: [
    // other imports
    UnderwriteProUiModule
  ],
  // ...
})
export class AppModule { }
```

2. Use the components in your templates:

```html
<uwp-card title="Example Card">
  <p>This is an example card from the Underwrite Pro UI library.</p>
</uwp-card>
```

## Theming

The library supports both light and dark themes. To use the dark theme, add the `dark-theme` class to a parent element:

```html
<div class="dark-theme">
  <!-- Components will use dark theme styles -->
  <uwp-card title="Dark Theme Card">
    <p>This card will use dark theme styles.</p>
  </uwp-card>
</div>
```

## Development

To develop this library:

1. Build the library:
```
ng build underwrite-pro-ui
```

2. Run the demo application:
```
ng serve
```

3. To add a new component to the library:
```
ng generate component components/new-component --project=underwrite-pro-ui
```
