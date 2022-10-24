import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
    if (changes['totalItems'].currentValue) {
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
    if (newPageNumber < 1) {
      return;
    }

    this.handlePageChange(newPageNumber);
  }

  handleIncrementPage(): void {
    const newPageNumber = this.currentPage + 1;
    if (this.pageCount + 1 == newPageNumber) {
      return;
    }

    this.handlePageChange(newPageNumber);
  }

  pageCountAsArray(): Array<number> {
    return new Array<number>(this.pageCount);
  }
}
