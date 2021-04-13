import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GdevAuthService } from 'gdev-auth';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AfiliadosService } from '../afiliados/services/afiliados.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  buscadorCtrl: FormControl = new FormControl('',);
  options: string[] = []
  filteredOptions?: Observable<string[]>;
  logged: boolean = false

  constructor(
    private _afiliados: AfiliadosService,
    public auth_: GdevAuthService
  ) {
    this.initSearchInput()
    this.loggedBehavior()
  }

  ngOnInit(): void {
  }

  loggedBehavior(): void {
    this._afiliados.afiliado$.subscribe(user => {
      this.logged = user ? true : false
    })
  }

  initSearchInput() {
    this.filteredOptions = this.buscadorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
