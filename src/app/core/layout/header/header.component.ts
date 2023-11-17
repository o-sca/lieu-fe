import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
    NgIf,
    MatButtonModule,
    MatToolbarModule,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = {} as Subscription;
  authenticated = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._subscription = this.auth.authChanged.subscribe(
      (status) => {
        this.authenticated = status;
      },
      (err) => console.error(err),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  signOut(): void {
    this.auth.signOut().subscribe((response) => {
      if (response.ok) {
        this.router.navigate([this.auth.redirectUrl]);
      }
    });
  }
}
