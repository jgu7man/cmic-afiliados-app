import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(value?: string, ...args: any[]): string {
    return value
    ? args[0].length > 0
      ? args[0][1]
        ? value.substring(args[0][1], args[0][0])
        : value.length > args[0] ?
          `${value.substring(0, args[0])}...`
          : value
      : value
    : ''
  }

}
