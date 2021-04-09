import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  buscadorCtrl: FormControl = new FormControl('',);
  options: string[] = []
  filteredOptions: Observable<string[]>;

  constructor() {
    this.filteredOptions = this.buscadorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
   }

  ngOnInit(): void {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
