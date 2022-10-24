import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageLength: number = 20;
  @Output() pageChange = new EventEmitter<number>();

  pageCount: number = 0;
  currentPage: number = 1;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // When the total items change the page count should be recalculated.
    if (changes['totalItems'].currentValue) {
      // The page count is the total items divided by the page length rounded up
      // to the nearest whole number.
      this.pageCount = Math.ceil(
          (changes['totalItems'].currentValue / this.pageLength));
    }
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }

  handleDecrementPage(): void {
    const newPageNumber = this.currentPage - 1;

    // If the user is trying to move down from page one, return.
    if (newPageNumber < 1) {
      return;
    }

    this.handlePageChange(newPageNumber);
  }

  handleIncrementPage(): void {
    const newPageNumber = this.currentPage + 1;

    // If the user is trying to move up from the last page , return.
    if (this.pageCount + 1 == newPageNumber) {
      return;
    }

    this.handlePageChange(newPageNumber);
  }
}
