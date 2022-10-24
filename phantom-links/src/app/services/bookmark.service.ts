import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Bookmark} from '../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  readonly BOOKMARKS_KEY = 'BOOkMARKS';

  // Declare subjects for bookmark events.
  private bookmarkAddedSubject$ = new Subject<Bookmark>();
  private bookmarkUpdatedSubject$ = new Subject<Bookmark>();
  private bookmarkRemovedSubject$ = new Subject<string>();

  // Declare obserbables to subscribe to bookmark events.
  $bookmarkAdded = this.bookmarkAddedSubject$.asObservable();
  $bookmarkUpdated = this.bookmarkUpdatedSubject$.asObservable();
  $bookmarkRemoved = this.bookmarkRemovedSubject$.asObservable();

  /**
   * Lists bookmarks from the collection
   * @return {Bookmark[]}
   */
  list(): Bookmark[] {
    // Gets the list of bookmarks as a JSON string from local storage by the given key.
    const jsonString = localStorage.getItem(this.BOOKMARKS_KEY);
    if (!jsonString) {
      return [];
    }

    // Parse the bookmarks from the JSON string into an array of Bookmarks.
    const bookmarks = JSON.parse(jsonString) as Bookmark[];
    return bookmarks;
  }

  /**
   * Gets a bookmark from the collection
   * @return {Bookmark}
   */
  get(bookmarkId: string): Bookmark | undefined {
    const collection = this.list();

    // Find the bookmark by id from the colletion.
    const bookmark = collection.find((b) => b.id === bookmarkId);
    return bookmark;
  }

  /**
   * Adds a bookmark to the collection.
   * @return {Bookmark}
   */
  add(bookmark: Bookmark): void {
    const bookmarks = this.list();

    // If a bookmark already exists with the same url or id then skip adding the bookmark.
    if (bookmarks.find((b) => b.url === bookmark.url || b.id == bookmark.id)) {
      return;
    }

    // Add the bookmark to the collection.
    bookmarks.push(bookmark);

    // Update the collection in local storage.
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));

    // Execute next on the bookmark added subject.
    this.bookmarkAddedSubject$.next(bookmark);
  }

  /**
  * Updates a bookmark in the collection.
  * @param {Bookmark} bookmark
  * @return {void}
  */
  update(bookmark: Bookmark): void {
    const bookmarks = this.list();
    const index = bookmarks.findIndex((b) => b.id === bookmark.id);

    // If the bookmark with a matching id cannot be found in the collection, return.
    if (index === undefined) {
      return;
    }

    // Update the bookmark at the found index.
    bookmarks[index] = bookmark;

    // Update the bookmark collection in localstorage.
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));

    // Execute next on the bookmarks update subject.
    this.bookmarkUpdatedSubject$.next(bookmark);
  }


  /**
  * Removes a bookmark from the collection.
  * @param {string} id
  * @return {void}
  */
  remove(id: string): void {
    const bookmarks = this.list();
    const index = bookmarks.findIndex((b) => b.id == id);

    // If the bookmark with a matching id cannot be found in the collection, return.
    if (index === undefined) {
      return;
    }

    // Remove the bookmark from the collection at the found index.
    bookmarks.splice(index, 1);

    // Update the bookmarks in local storage.
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));

    // Execute next on the bookmarks removed subject.
    this.bookmarkRemovedSubject$.next(id);
  }
}
