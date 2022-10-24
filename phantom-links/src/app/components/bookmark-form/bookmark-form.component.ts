import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Bookmark} from 'src/app/models/bookmark.model';
import {BookmarkService} from 'src/app/services/bookmark.service';
import {uuidv4} from 'src/app/utils/uuid.utils';
import {urlIsValid} from 'src/app/validators/url-is-valid.validator';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  url: FormControl = new FormControl('', [urlIsValid, this.duplicateUrlValidator()]);

  @Input() bookmark: Bookmark | undefined;
  @Output() bookmarkSubmit = new EventEmitter<Bookmark>();

  constructor(
    private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    // If a bookmark has been passed into the component, then set the url control
    // to the passed in bookmarks url.
    if (this.bookmark) {
      this.url.setValue(this.bookmark.url);
    }
  }

  handleAddBookmark(): void {
    if (!this.url.valid) {
      return;
    }

    const url = this.url.value;
    if (!url) {
      return;
    }

    // Create a new bookmark with the given url, a new uuid and current date.
    const bookmark: Bookmark = {
      url: url,
      id: uuidv4(),
      date: new Date().toISOString(),
    };

    // Add the bookmark to the collection.
    this.bookmarkService.add(bookmark);

    // Emit the bookmark submit event.
    this.bookmarkSubmit.emit(bookmark);
  }

  handleUpdateBookmark(): void {
    if (!this.url.valid || !this.url.value || !this.bookmark) {
      return;
    }

    this.bookmark.url = this.url.value;
    this.bookmarkSubmit.emit(this.bookmark);
  }

  duplicateUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Find any bookmarks in the collection that don't have the same id
      // but have the same URL.
      const duplicate = this.bookmarkService.list()
          .filter((b) => this.bookmark ? this.bookmark.id !== b.id : true)
          .find((b) => b.url.toLowerCase() == value.toLowerCase());

      return duplicate ? {duplicateUrl: true} : null;
    };
  }
}
