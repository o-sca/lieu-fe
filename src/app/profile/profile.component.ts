import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TrackedRequest } from '../core/schemas/requests.schema';
import { AuthService } from '../core/services/auth.service';
import { ProfileService } from '../core/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginatorModule, MatTableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  username: string;
  email: string;
  userType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<TrackedRequest>;
  displayedColumns: string[];

  requestsMade: number;

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.username = '';
    this.email = '';
    this.userType = '';
    this.requestsMade = 0;

    this.dataSource = new MatTableDataSource<TrackedRequest>();
    this.displayedColumns = ['createdAt', 'input', 'output'];
    this.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      this.changeDetector,
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.auth.checkMe().subscribe({
      next: (response) => {
        this.username = response['username'];
        this.email = response['email'];
        this.userType = response['user_type'];
      },
      error() {
        return;
      },
    });

    this.profile.getProfile().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.requestsMade = response.length;
      },
      error: () => {
        return;
      },
    });
  }

  ngOnDestroy(): void {
    return;
  }
}
