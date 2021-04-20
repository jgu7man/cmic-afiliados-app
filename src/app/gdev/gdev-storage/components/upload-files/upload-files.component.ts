import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GdevStorage } from '../../storage-service.service';
import { iUploadedFile } from '../../storage.model';

@Component({
  selector: 'gdev-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit, OnDestroy {

  // public files: any[] = []
  public uploadingFiles: boolean = false
  public cantUploaded: number = 0
  public fileSubscription?: Subscription
  public uploadedFiles:iUploadedFile[] = []

  @Input() path: string
  @Input() prefixName: string
  @Input() metadata?: Object

  @Input() multiple: boolean = true
  @Input() maxFileSize?: number

  @Input() showDropzone: boolean = false
  @Input() uploadButton: boolean = true
  @Input() uploadStatus: boolean = true

  @Input() toggleButtonLabel: string = 'Subir archivos'
  @Input() uploadButtonLabel: string = 'Subir'
  @Input() dropzoneLabel: string = 'Arrastra los archivos o toca aquí'

  @Output() uploadComplete: EventEmitter<iUploadedFile[]>
    = new EventEmitter();

  private triggerSubscription?: Subscription

  constructor(
    public storage_: GdevStorage
  ) {
    this.path = this.storage_.path
    this.prefixName = this.storage_.prefixName
    this.metadata = this.storage_.metadata
  }

  ngOnInit(): void {
    if (this.uploadButton === false) {
      this.triggerSubscription =
      this.storage_.upload$
        .pipe(debounceTime(2000))
        .subscribe(() => {
        this.loadFiles()
      })
    }
  }



  onSelect(event: any) {
    this.storage_.files.push(...event.addedFiles);
    // const formData = new FormData();
    // for (var i = 0; i < this._storage.files.length; i++) {
    //   formData.append('file[]', this.files[i]);
    // }
  }

  onRemove(file: any) {
    this.storage_.files.splice(this.storage_.files.indexOf(file), 1);
  }


  loadFiles() {
    this.uploadedFiles = []
    this.uploadingFiles = true;
    this.storage_.asyncForEach(this.storage_.files, (file: any) => {
      this.fileSubscription = this.storage_
        .uploadFiles(file, this.path, this.prefixName, this.metadata )
        .subscribe(
          (fileInfo: iUploadedFile) => {
            if (fileInfo.uploadedState === true){
              this.cantUploaded = ++this.cantUploaded
              this.uploadedFiles.push(fileInfo)
            }
            if (this.storage_.files.length === this.cantUploaded) {
              this.uploadComplete.emit(this.uploadedFiles)
              this.storage_.uploadComplete$.next(this.uploadedFiles)
            }
          },
          (err: any) => console.error(err)

        )
    })

  }

  get UploadedPercent(): void | number {
    let percent = (100 / this.storage_.files.length) * this.cantUploaded
    if (percent === 100) {
      this.showDropzone = false
      if (this.fileSubscription) this.fileSubscription.unsubscribe()
    }
    else return percent
  }

  ngOnDestroy(): void {
    if (this.fileSubscription) this.fileSubscription.unsubscribe()
    if (this.triggerSubscription) this.triggerSubscription.unsubscribe()
  }

}
