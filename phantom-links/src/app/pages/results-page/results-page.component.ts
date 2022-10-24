import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})

/**
  A component containing the results page.
*/
export class ResultsPageComponent implements OnInit {
  bookmarkId: string | undefined;
  bookmark: Bookmark | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router) { }

  /**
  * The intialization lifecycle hook for this component.
  * @return {void}
  */
  ngOnInit(): void {
    // Subscribe to the current route query parameters to retrieve
    // the bookmark id to display results for.
    this.route.queryParams
      .subscribe((params) => {
        this.bookmarkId = params['id'];
        this.getBookmark();
      });
  }

  /**
  * Gets the bookmark from the collection with the id given in the route.
  * @return {void}
  */
  getBookmark(): void {
    if (!this.bookmarkId) {
      return;
    }

    // Get the bookmark by the given id.
    this.bookmark = this.bookmarkService
      .get(this.bookmarkId);
  }

  /**
  * Handles the back button clicked.
  * @return {void}
  */
  handleBackClicked(): void {
    // If user clicks the back button then it should return
    // to the default page (Overview).
    this.router.navigate(['']);
  }
}
