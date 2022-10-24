import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enumerateNumber',
})

/**
 * Transforms a given number into an array that matches the numbers length.
 */
export class EnumerateNumberPipe implements PipeTransform {
  transform(n: number): number[] {
    return [...Array(n)].map((_, i) => i);
  }
}
