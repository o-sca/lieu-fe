import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SummaryService } from '../core/services/summary.service';
import { SpinnerService } from '../core/services/spinner.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  @ViewChild('pInput') pInput: ElementRef | undefined;
  @ViewChild('gInput') gInput: ElementRef | undefined;
  resultText: string;
  errorMessage: string;
  selected: FormControl;

  constructor(
    private summary: SummaryService,
    public spinner: SpinnerService,
  ) {
    this.resultText = '';
    this.errorMessage = '';
    this.selected = new FormControl(0);
  }

  summarise() {
    this.summary.summarise(this.pInput?.nativeElement.value).subscribe({
      next: (response) => {
        this.resultText = response.result_text;
      },
      error: (err) => {
        this.errorMessage = err.error.error;
      },
    });
  }

  generate() {
    this.summary.generate(this.gInput?.nativeElement.value).subscribe({
      next: (response) => {
        this.resultText = response.result_text;
      },
      error: (err) => {
        this.errorMessage = err.error.error;
      },
    });
  }
}
