import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SummaryService } from '../core/services/summary.service';
import { AuthService } from '../core/services/auth.service';

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
    MatInputModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  constructor(
    private summary: SummaryService,
    private auth: AuthService,
  ) {}

  onSubmit() {
    this.auth.checkAuth().subscribe();
  }

  openUploadSheet() {
    return;
  }
}
