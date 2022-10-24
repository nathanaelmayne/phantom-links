import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerateNumber',
})
export class EnumerateNumberPipe implements PipeTransform {
  transform(n: number): number[] {
    return [...Array(n)].map((_, i) => i);
  }
}
