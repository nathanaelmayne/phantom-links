import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Params, Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { EditBookmarkDialogComponent } from 'src/app/components/edit-bookmark-dialog/edit-bookmark-dialog.component';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  tableColumns: string[] = ["url"];

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.list();
  }

  handleBookmarkSubmitted(bookmark: Bookmark): void {
    this.router.navigate(['Results'], {
      queryParams: <Params>{
        'id': bookmark.id,
      },
    });
  }

  handleRemoveBookmark(url: string): void {
    this.bookmarkService.remove(url);
    this.bookmarks = this.bookmarkService.list();
  }

  onEditClick(bookmark: Bookmark): void {
    this.dialog.open(EditBookmarkDialogComponent, {
      data: bookmark,
    })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.bookmarkService.update(bookmark);
          this.bookmarks = this.bookmarkService.list();
        }
      });
  }

  onDeleteClick(bookmark: Bookmark): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        message: 'Are you sure you want to delete this bookmark?',
        confirmText: 'Delete',
      },
    })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.bookmarkService.remove(bookmark.id);
          this.bookmarks = this.bookmarkService.list();
        }
      });
  }
}
