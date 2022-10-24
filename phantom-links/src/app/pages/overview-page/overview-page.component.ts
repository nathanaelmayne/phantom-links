import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview.page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  tableColumns: string[] = ["url"];

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router) { }

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
}
