import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, Subscription, timer } from 'rxjs';
import { concatAll, debounce } from 'rxjs/operators';
import { GdevStorage } from '../../storage-service.service';
import { iUploadedFile, iUploadOptions } from '../../storage.model';

@Component({
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class GdevUploadModalComponent implements OnInit, OnDestroy {

  public uploadingFiles: boolean = false
  public cantUploaded: number = 0
  public fileSubscription?: Subscription
  public uploadedFiles:iUploadedFile[] = []

  @Output() uploadComplete: EventEmitter<iUploadedFile[]>
    = new EventEmitter();

  private triggerSubscription?: Subscription
  public options: iUploadOptions = {
    path: '' ,
    multiple: true,
    showDropzone: true,
    uploadButton: false,
    uploadStatus: true,
    toggleButtonLabel:  'Subir archivos',
    uploadButtonLabel: 'Subir',
    dropzoneLabel: 'Arrastra los archivos o toca aquí',
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) clientOptions: iUploadOptions,
    public dialog_: MatDialogRef<GdevUploadModalComponent>,
    public storage_: GdevStorage
  ) {
    this.options = {...this.options, ...clientOptions}
    if (this.storage_.path) this.options.path = this.storage_.path
    if (this.storage_.prefixName) this.options.prefixName = this.storage_.prefixName
    if (this.storage_.metadata) this.options.metadata = this.storage_.metadata
  }

  ngOnInit(): void {
    if (this.options.uploadButton === false) {
      this.triggerSubscription =
      this.storage_.upload$
        .pipe(
          debounce(() => timer(1000)),
        )
        .subscribe(() => {
        this.loadFiles()
      })
    }
  }



  onSelect(event: any) {
    let files = event.addedFiles as any[];
    if (this.options.compareDimensions) {
      files.forEach(file => {
        let matchFile = this.storage_.compareDimensions(file,
          this.options.compareDimensions == 'equals' ? true : false)
        if (matchFile)
        this.storage_.files.push(file);
      })
    } else {
      this.storage_.files.push(...files)
    }

    if (!this.options.uploadButton) {
      this.loadFiles()
    }
  }

  onRemove(file: any) {
    this.storage_.files.splice(this.storage_.files.indexOf(file), 1);
  }


  async loadFiles() {
    this.uploadedFiles = []
    this.uploadingFiles = true;

    var uploads:any[] = []

    console.log(  )

    await this.storage_.asyncForEach(this.storage_.files, async (file: any) => {
      uploads.push(
        this.storage_.uploadFile(file, this.options.path,
          this.options.prefixName ? this.options.prefixName : null,
          this.options.metadata ? this.options.metadata : null
        )
      )
    })

    return this.fileSubscription = from(uploads)
      .pipe(concatAll<iUploadedFile>())
      .subscribe(
        (fileInfo) => {
          if (fileInfo.uploadedState === true){
            this.cantUploaded = ++this.cantUploaded
            this.uploadedFiles.push(fileInfo)
          }
          if (this.storage_.files.length === this.cantUploaded) {
            this.storage_.uploadComplete$.next(this.uploadedFiles)
          }
        },
        (err: any) => console.error(err)

      )
  }

  get UploadedPercent(): void | number {
    let percent = (100 / this.storage_.files.length) * this.cantUploaded
    if (percent === 100) {
      this.options.showDropzone = false
      if (this.fileSubscription && this.cantUploaded === this.storage_.files.length) {
        this.storage_.files = []
        this.dialog_.close(this.uploadedFiles)
      }
    }
    else return percent
  }

  ngOnDestroy(): void {
    if (this.fileSubscription) this.fileSubscription.unsubscribe()
    if (this.triggerSubscription) this.triggerSubscription.unsubscribe()
  }

}
