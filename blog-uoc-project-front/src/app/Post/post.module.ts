import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppCardComponent } from '../Shared/Components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    FormatDatePipe,
    DashboardComponent,
    AppCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
  ],
})
export class PostModule {}
