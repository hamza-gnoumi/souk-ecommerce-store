import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  getImages() {
    return [
      {
        itemImageSrc: '../../assets/images/gallery 1.jpeg',
        alt: 'Gallery 1',
        title: 'Gallery 1'
      },
      {
        itemImageSrc: '../../assets/images/gallery 2.jpeg',
        alt: 'Gallery 2',
        title: 'Gallery 2'
      },
      {
        itemImageSrc: '../../assets/images/gallery 3.jpeg',
        alt: 'Gallery 3',
        title: 'Gallery 3'
      },
      {
        itemImageSrc: '../../assets/images/gallery 4.jpeg',
        alt: 'Gallery 4',
        title: 'Gallery 4'
      },
      {
        itemImageSrc: '../../assets/images/gallery 5.jpeg',
        alt: 'Gallery 5',
        title: 'Gallery 5'
      },
    ]
  }
}
