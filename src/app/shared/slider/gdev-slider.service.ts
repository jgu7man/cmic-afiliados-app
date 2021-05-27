import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
// import { MxAlert } from '../alert/alert.service';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { MatCarousel, Orientation, SvgIconOverrides } from './mat-carousel/carousel';
import { SlideModel, SliderConfig } from './gdev-slide.model';

@Injectable({
  providedIn: 'root'
})
export class GdevSliderService {


  sliderConfig: SliderConfig = {
    timings: "250ms ease-in",
    autoplay : true,
    interval: 5000,
    color: "primary",
    maxWidth: "auto",
    proportion: 30,
    slides: 5,
    loop: true,
    hideArrows: false,
    hideIndicators: false,
    useKeyboard: true,
    useMouseWheel: false,
    orientation: "ltr",
    maintainAspectRatio: true,
    slideHeight:'100%'
  }

  $sliderConfig: BehaviorSubject<SliderConfig> = new BehaviorSubject(this.sliderConfig)
  slides$: Observable<any> = new Observable()

  constructor (
    private fs: AngularFirestore,
    private storage: AngularFireStorage,
    // private alertas: MxAlert,
    private location: Location
  ) {
  }

  async addSlide( slide: SlideModel, collection?: string ) {
    const slidesRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides' )
    var nuSlide = await slidesRef.add( slide )
    slidesRef.doc(nuSlide.id).update({id: nuSlide.id})
    return
  }

  getSlidesList( collection?: string) {
    return this.slides$ = this.fs.collection<SlideModel>( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides' )
    .valueChanges()
  }


  async loadSlides(collection?: string) {
    try {
      const sliderRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides'
      ).ref.where('activado','==', true)


      const slidesDocs = await sliderRef.get()
      const slides: any[] = []

      slidesDocs.forEach( slide => {
        slides.push(slide.data() as SlideModel)
      } )

      return slides
    } catch (error) {
      console.error
      return []
    }
  }

  async updateSlide(slide: SlideModel, collection?: string) {
    const slidesRef = this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'gdev-tools/slider/slides' ).ref
    slidesRef.doc( slide.id ).update( slide )
    return
  }


  async deleteSlide( slide: SlideModel, collection?: string ) {
    await this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'gdev-tools/slider/slides' ).ref
      .doc( slide.id ).delete()
    await this.storage.storage.refFromURL( slide.imageURL ).delete()
    // this.alertas.notify('Se borró la slide')
    return
  }

  async loadConfiguration( collection?: string) {
    const sliderRef = this.fs.collection( collection
      ? collection : 'gdev-tools' ).ref.doc( 'slider' )
    const sliderDoc = await sliderRef.get()
    if ( sliderDoc.exists ) {
      this.$sliderConfig.next(sliderDoc.data() as SliderConfig)
    }

  }

  async setSliderConfiguration( config: SliderConfig, collection?: string ) {
    try {
      const sliderRef = this.fs.collection( collection
        ? collection : 'gdev-tools' ).ref.doc( 'slider' )
      await sliderRef.set( config, { merge: true } )
      // this.alertas.message( 'Se guardó la configuración' )
      // this.location.back()
      return
    } catch ( error ) {
      console.error(error);
      return
    }
  }


}


