import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
})
export class NoimagePipe implements PipeTransform {
  transform(images: string): string {
    console.log(images);
    if (!images) {
      return 'assets/noimage.png';
    }

    if (images.length > 0) {
      return images;
    } else {
      return 'assets/noimage.png';
    }
  }
}
