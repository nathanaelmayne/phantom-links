import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  readonly BOOKMARKS_KEY = 'BOOkMARKS';

  private bookmarkAddedSubject$ = new Subject<Bookmark>();
  private bookmarkUpdatedSubject$ = new Subject<Bookmark>();
  private bookmarkRemovedSubject$ = new Subject<string>();

  $bookmarkAdded = this.bookmarkAddedSubject$.asObservable();
  $bookmarkUpdated = this.bookmarkUpdatedSubject$.asObservable();
  $bookmarkRemoved = this.bookmarkRemovedSubject$.asObservable();

  list(): Bookmark[] {
    const jsonString = localStorage.getItem(this.BOOKMARKS_KEY);
    if (!jsonString) {
      return [];
    }

    const bookmarks = JSON.parse(jsonString) as Bookmark[];
    return bookmarks;
  }

  get(bookmarkId: string): Bookmark | undefined {
    const collection = this.list();

    const bookmark = collection.find((b) => b.id === bookmarkId);
    return bookmark;
  }

  add(bookmark: Bookmark): void {
    const bookmarks = this.list();
    if (bookmarks.find((b) => b.url === bookmark.url)) {
      return;
    }

    bookmarks.push(bookmark);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
    this.bookmarkAddedSubject$.next(bookmark);
  }

  update(bookmark: Bookmark): void {
    const bookmarks = this.list();
    const index = bookmarks.findIndex((b) => b.id === bookmark.id);

    if (index === undefined) {
      return;
    }

    bookmarks[index] = bookmark;
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
    this.bookmarkUpdatedSubject$.next(bookmark);
  }

  remove(id: string): void {
    const bookmarks = this.list();
    const index = bookmarks.findIndex((b) => b.id == id);
    if (index === undefined) {
      return;
    }

    bookmarks.splice(index, 1);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
    this.bookmarkRemovedSubject$.next(id);
  }
}
