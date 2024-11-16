import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  addButtonTextInput = input.required<string>();
  addButtonOutput = output();

  odAddButtonClick() {
    this.addButtonOutput.emit();
  }
}
