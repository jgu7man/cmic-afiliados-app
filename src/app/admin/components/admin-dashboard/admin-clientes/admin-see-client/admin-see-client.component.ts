import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GdevDate } from 'src/app/gdev/gdev-date.service';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { iCliente } from 'src/app/public/clientes/models/cliente.model';

@Component({
  selector: 'g-admin-see-client',
  templateUrl: './admin-see-client.component.html',
  styleUrls: ['./admin-see-client.component.scss']
})
export class AdminSeeClientComponent implements OnInit {

  @Input() cliente?: iCliente
  @Output() closePanel: EventEmitter<void> = new EventEmitter()

  constructor(
    public date_: GdevDate
  ) { }

  ngOnInit(): void {
  }

  viewPDF(file: iUploadedFile) {
    if (file.url && file.format?.includes('pdf')) {
      return file.url as string
    } else return null
  }

}
