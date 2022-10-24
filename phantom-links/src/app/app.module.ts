import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {ResultsPageComponent} from './pages/results-page/results-page.component';
import {BookmarkFormComponent} from './components/bookmark-form/bookmark-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './components/table/table.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {EnumerateNumberPipe} from './pipes/enumerate-number.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {EditBookmarkDialogComponent} from './components/edit-bookmark-dialog/edit-bookmark-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewPageComponent,
    ResultsPageComponent,
    BookmarkFormComponent,
    TableComponent,
    PaginatorComponent,
    EnumerateNumberPipe,
    ConfirmDialogComponent,
    EditBookmarkDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
