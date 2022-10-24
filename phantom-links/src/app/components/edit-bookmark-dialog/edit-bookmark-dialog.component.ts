import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bookmark} from 'src/app/models/bookmark.model';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-bookmark-dialog',
  templateUrl: './edit-bookmark-dialog.component.html',
  styleUrls: ['./edit-bookmark-dialog.component.scss'],
})

/**
  A component containing the edit bookmark dialog.
*/
export class EditBookmarkDialogComponent {
  url = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public bookmark: Bookmark) {
    this.url.setValue(bookmark.url);
  }

  handleSave(bookmark: Bookmark): void {
    this.dialogRef.close(bookmark);
  }
}
