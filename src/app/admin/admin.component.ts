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
import { TrackedRequest } from '../core/schemas/requests.schema';
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
  dataSource: MatTableDataSource<TrackedRequest>;
  displayedColumns: string[];
  displayedColumnsWithExpand: string[];

  expandedRequest?: TrackedRequest | null;

  constructor(
    public spinner: SpinnerService,
    public changeDetector: ChangeDetectorRef,
    private admin: AdminService,
  ) {
    this.dataSource = new MatTableDataSource<TrackedRequest>();
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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.admin.getAll().subscribe((requests) => {
      this.dataSource.data = requests;
    });
    return;
  }
}
