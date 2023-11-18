import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../core/services/profile.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  name: string;
  email: string;
  userType: string;

  constructor(private profile: ProfileService) {
    this.name = '';
    this.email = '';
    this.userType = '';
  }

  ngOnInit(): void {
    this.profile.getProfile().subscribe({
      next: (response) => {
        this.name = response['name'];
        this.email = response['email'];
        this.userType = response['user_type'];
      },
      error(err) {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    return;
  }
}
