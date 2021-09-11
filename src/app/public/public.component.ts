import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit, OnDestroy {


  routeSubscription: Subscription
  constructor(
    private _route: ActivatedRoute,
    private _title: Title,

  ) {
    this.routeSubscription =
      this._route.data.subscribe( data => {
      // console.log( data )
      this._title.setTitle(data['page'])
    })


   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }

}
