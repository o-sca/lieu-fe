import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  Endpoint,
  RequestUser,
  TrackedRequest,
} from '../core/schemas/requests.schema';
import { AdminService } from '../core/services/admin.service';
import { SpinnerService } from '../core/services/spinner.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  requestDataSource: MatTableDataSource<TrackedRequest>;
  displayedColumns: string[];
  displayedColumnsWithExpand: string[];

  expandedRequest?: TrackedRequest | null;

  endpointDataSource: MatTableDataSource<Endpoint>;
  endpointDisplayedColumns: string[];

  userDataSource: MatTableDataSource<RequestUser>;
  userDisplayedColumns: string[];

  constructor(
    public spinner: SpinnerService,
    public changeDetector: ChangeDetectorRef,
    private admin: AdminService,
  ) {
    this.requestDataSource = new MatTableDataSource<TrackedRequest>();
    this.displayedColumns = [
      'username',
      'user_type',
      'input',
      'output',
      'createdAt',
    ];
    this.displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
    this.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      this.changeDetector,
    );

    this.endpointDataSource = new MatTableDataSource<Endpoint>();
    this.endpointDisplayedColumns = ['path', 'method', 'count'];

    this.userDataSource = new MatTableDataSource<RequestUser>();
    this.userDisplayedColumns = ['username', 'user_type', 'request_count'];
  }

  ngAfterViewInit(): void {
    this.requestDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.admin.getAll().subscribe((requests) => {
      this.requestDataSource.data = requests;
    });

    this.admin.getEndpointCount().subscribe((endpoints) => {
      this.endpointDataSource.data = endpoints;
    });

    this.admin.getAllUsers().subscribe((users) => {
      this.userDataSource.data = users;
    });
    return;
  }

  upgradeToAdmin(userId: number) {
    return this.admin.upgradeToAdmin(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  downgradeToUser(userId: number) {
    return this.admin.downgradeToUser(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }
}
