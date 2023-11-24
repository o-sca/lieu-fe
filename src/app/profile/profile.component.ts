import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../core/services/auth.service';
import { ProfileService } from '../core/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  username: string;
  email: string;
  userType: string;

  dataSource: { createdAt: string; input: string; output: string }[];
  displayedColumns: string[];

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
  ) {
    this.username = '';
    this.email = '';
    this.userType = '';

    this.dataSource = [];
    this.displayedColumns = ['createdAt', 'input', 'output'];
  }

  ngOnInit(): void {
    this.auth.checkMe().subscribe({
      next: (response) => {
        this.username = response['username'];
        this.email = response['email'];
        this.userType = response['user_type'];
      },
      error(err) {
        console.error(err);
      },
    });

    this.profile.getProfile().subscribe({
      next: (response) => {
        this.dataSource = response['requests'];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    return;
  }
}
