import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit {
  bookmarkId: string | undefined;
  bookmark: Bookmark | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.bookmarkId = params['id'];
        this.getBookmark();
      });
  }

  getBookmark(): void {
    if (!this.bookmarkId) {
      return;
    }

    this.bookmark = this.bookmarkService
      .get(this.bookmarkId);
  }

  handleBackClicked(): void {
    this.router.navigate(['']);
  }
}
