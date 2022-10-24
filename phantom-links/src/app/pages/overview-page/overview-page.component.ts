import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Params, Router } from '@angular/router';
import { combineLatest, startWith, Subscription } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { EditBookmarkDialogComponent } from 'src/app/components/edit-bookmark-dialog/edit-bookmark-dialog.component';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})

/**
  A component containing the app overview page.
*/
export class OverviewPageComponent implements OnInit, OnDestroy {
  bookmarks: Bookmark[] = [];
  tableColumns: string[] = ['url'];
  bookmarkEvents: Subscription | undefined;

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private dialog: MatDialog) { }

  /**
  * The on initilization hook for this component.
  * @return {void}
  */
  ngOnInit(): void {
    // First populate the list of bookmarks.
    this.populateList();

    // Set up a subscription to all bookmark events that should trigger an update
    // to the list of bookmarks.
    this.bookmarkEvents = combineLatest([
      this.bookmarkService.$bookmarkAdded.pipe(startWith(undefined)),
      this.bookmarkService.$bookmarkUpdated.pipe(startWith(undefined)),
      this.bookmarkService.$bookmarkRemoved.pipe(startWith(undefined)),
    ]).subscribe((res) => {
      // If none of the events have returned data do not update the list.
      if (res.find((r) => r)) {
        this.populateList();
      }
    });
  }

  /**
  * The on destroy lifecycle method for this component.
  * @return {void}
  */
  ngOnDestroy(): void {
    // Unsubscribe from the bookmark events subscription if it is in progress.
    if (this.bookmarkEvents && !this.bookmarkEvents.closed) {
      this.bookmarkEvents.unsubscribe();
    }
  }

  /**
  * Populates the list of bookmarks from the collection.
  * @return {void}
  */
  populateList(): void {
    // Get the bookmarks and order by date descending order.
    this.bookmarks = this.bookmarkService.list()
      .sort((a, b) => a.date < b.date ? 1 : -1);
  }

  /**
  * Handles the bookmark submitted from the form.
  * @param {Bookmark} bookmark
  * @return {void}
  */
  handleBookmarkSubmitted(bookmark: Bookmark): void {
    // Once the user has submitted a bookmark, navigate to the results page and pass
    // the bookmark id as a route parameter.
    this.router.navigate(['Results'], {
      queryParams: <Params>{
        'id': bookmark.id,
      },
    });
  }

  /**
  * Handles the bookmark removed.
  * @param {string} url
  * @return {void}
  */
  handleRemoveBookmark(url: string): void {
    this.bookmarkService.remove(url);
  }

  /**
  * Handles the edit bookmark button click.
  * @param {Bookmark} bookmark
  * @return {void}
  */
  onEditClick(bookmark: Bookmark): void {
    // Open the edit bookmark dialog and pass the bookmark object via the data parameter.
    this.dialog.open(EditBookmarkDialogComponent, {
      data: bookmark,
    })
      .afterClosed()
      .subscribe((result: Bookmark) => {
        // After the edit bookmark dialog has been closed and returned an object,
        // update the bookmark in the collection.
        if (result) {
          this.bookmarkService.update(result);
        }
      });
  }

  /**
  * Handles the delete bookmark button click
  * @param {Bookmark} bookmark
  * @return {void}
  */
  onDeleteClick(bookmark: Bookmark): void {
    // Open a confirm dialog to confirm the user want to delete the bookmark.
    this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        message: 'Are you sure you want to delete this bookmark?',
        confirmText: 'Delete',
      },
    })
      .afterClosed()
      .subscribe((res: boolean) => {
        // After the confirm dialog has returned a true response,
        // Remove the bookmark from the collection.
        if (res) {
          this.bookmarkService.remove(bookmark.id);
        }
      });
  }
}
