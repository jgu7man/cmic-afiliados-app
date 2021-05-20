import { Component, Input, OnInit } from '@angular/core';
import { iUploadedFile } from '@marxa/storage';

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
