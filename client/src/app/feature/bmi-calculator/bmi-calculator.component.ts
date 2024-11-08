import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.scss',
})
export class BmiCalculatorComponent {
  bmiForm = this.generateBmiForm();
  isSubbmited = signal<boolean>(false);
  bmi = signal<number>(null);
  status = signal<string>('');

  generateBmiForm() {
    return new FormGroup({
      weight: new FormControl<number>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      height: new FormControl<number>(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  onFormSubmit() {
    this.bmiForm.markAllAsTouched();
    this.isSubbmited.set(true);

    if (this.bmiForm.invalid) return;

    console.log(this.bmiForm.controls.height.value);

    if (
      this.bmiForm.controls.height.value !== null &&
      this.bmiForm.controls.weight.value !== null
    ) {
      const heightInMeters: number = this.bmiForm.controls.height.value / 100;

      const bmiCalc =
        this.bmiForm.controls.height.value +
        (
          this.bmiForm.controls.weight.value /
          (heightInMeters * heightInMeters)
        ).toFixed(2);

      this.bmi.set(Number(bmiCalc));
    }

    if (this.bmi() < 18.5) {
      this.status.set('Underweight');
    } else if (this.bmi() < 24.9) {
      this.status.set('Normal weight');
    } else if (this.bmi() < 29.9) {
      this.status.set('Overweight');
    } else {
      this.status.set('Obesity');
    }
  }
}
