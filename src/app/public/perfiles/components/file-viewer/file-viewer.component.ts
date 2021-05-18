import { Component, Input, OnInit } from '@angular/core';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';

@Component({
  selector: 'g-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  @Input() file?: iUploadedFile
  constructor() { }

  ngOnInit(): void {
  }

}
