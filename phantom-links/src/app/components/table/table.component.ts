import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  @Input() items: T[] = [];
  @Input() columns: string[] = [];
  @Input() buttonTemplate: TemplateRef<HTMLElement> | undefined;

  pageLength: number = 20;
  currentPage: number = 1;

  constructor() { }

  getPagedItems(): T[] {
    // The start of the paged items should be the current page - 1 (to account for 0 index) times the length of the page.
    const start = (this.currentPage - 1) * this.pageLength;

    // The end of the paged items should be the start calculated above,
    // plus the length of the page.
    const end = start + this.pageLength;

    // Returned the paged items by the given start and end values.
    return this.items.slice(start, end);
  }

  getCellItem(item: T, column: string): string {
    // Retrieve a cell item by the given column name.
    return item[column];
  }
}
