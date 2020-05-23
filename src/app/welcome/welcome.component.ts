import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() {}

  ngOnInit(): void {
    this.galleryOptions = [
     
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageDescription: true,
        previewDescription:true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewBullets:true,
        // imageAutoPlay: true,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/crunche.jpg',
        medium: 'assets/crunche.jpg',
        big: 'assets/crunche.jpg',
        description:
          'crunch is an exercise which you lie on your back on the floor with your knees bent and your feet flat on the floor, and then raise your head and shoulders: Doing crunches every day strengthens your abdominal muscles.',
      },
      {
        small: 'assets/touch-toes.jpg',
        medium: 'assets/touch-toes.jpg',
        big: 'assets/touch-toes.jpg',
        description:'Stretching out your lower back and hamstrings via toe touches also helps to boost circulation, meaning that post-exercise repair is speedier and more efficient, and the more blood and oxygen you get to your joints, the better for long term mobility and well as short term gains'
      },
      {
        small: 'assets/side-lunges .jpg',
        medium: 'assets/side-lunges .jpg',
        big: 'assets/side-lunges .jpg',
        description:'This lateral movement targets the inner and outer thighs and helps to strengthen and tone those areas of your legs. This is also an excellent move to strengthen your quads, hamstrings and glutes, which makes the side lunge a very complete lower body exercise.'
      },
      {
        small: 'assets/burpees.jpg',
        medium: 'assets/burpees.jpg',
        big: 'assets/burpees.jpg',
        description:
          'The burpee works your arms, back, chest, core, glutes and legs – you name it, it works it. And burpees also spike your heart rate as much as sprinting for a bus does'
      },
    ];
  }
}
