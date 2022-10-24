import { Component, Input, TemplateRef } from '@angular/core';

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
    const start = (this.currentPage - 1) * this.pageLength;
    const end = start + this.pageLength;
    return this.items.slice(start, end);
  }

  getCellItem(item: T, column: string): string {
    return item[column];
  }
}
