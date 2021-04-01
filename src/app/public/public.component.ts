import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'g-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _title: Title
  ) {
    this._route.data.subscribe(data => {
      this._title.setTitle(data['page'])
    })
   }

  ngOnInit(): void {
  }

}
