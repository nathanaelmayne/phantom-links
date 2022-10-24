import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { uuidv4 } from 'src/app/utils/uuid.utils';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  url: FormControl = new FormControl('');

  @Input() bookmark: Bookmark | undefined;
  @Output() bookmarkSubmit = new EventEmitter<Bookmark>();

  constructor(
    private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
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

    const bookmark: Bookmark = {
      url: url,
      id: uuidv4(),
      date: new Date().toISOString(),
    };

    this.bookmarkService.add(bookmark);
    this.bookmarkSubmit.emit(bookmark);
  }

  handleUpdateBookmark(): void {
    if (!this.url.valid || !this.url.value || !this.bookmark) {
      return;
    }

    this.bookmark.url = this.url.value;
    this.bookmarkSubmit.emit(this.bookmark);
  }
}
