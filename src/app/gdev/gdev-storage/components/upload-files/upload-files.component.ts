import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Subscription, timer } from 'rxjs';
import { concatAll, debounce, take } from 'rxjs/operators';
import { GdevStorage } from '../../storage-service.service';
import { iUploadedFile } from '../../storage.model';
import { GdevUploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'gdev-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit, OnDestroy {

  public uploadingFiles: boolean = false
  public dropedFiles: any[] = []
  public cantUploaded: number = 0

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
  @Input() disable: boolean = false
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary'

  @Input() openModal: boolean = false

  @Output() uploadComplete: EventEmitter<iUploadedFile[]>
    = new EventEmitter();

  private triggerSubscription?: Subscription

  constructor(
    public storage_: GdevStorage,
    private _dialog: MatDialog
  ) {
    this.path = this.storage_.path
    this.prefixName = this.storage_.prefixName
    this.metadata = this.storage_.metadata
  }

  ngOnInit(): void {
    if (this.showDropzone) this.storage_.showDropzone = this.showDropzone
    if (this.uploadButton === false) {
      this.triggerSubscription =
      this.storage_.upload$
        .pipe(
          // debounce(() => timer(10000)),
          take(1)
        )
        .subscribe(() => {
          console.log( 'files' )
        this.loadFiles()
      })
    }
  }

  onToggleClicked() {
    if (!this.openModal) {
      this.storage_.showDropzone = !this.storage_.showDropzone
    } else {
      this._dialog.open(GdevUploadModalComponent, {
        width: '40%',
        minHeight: '40%',
        data: {
          path: this.path,
          multiple: this.multiple,
          uploadButton: this.uploadButton,
          showDropzone: this.showDropzone,
          uploadStatus: this.uploadStatus,
          toggleButtonLabel: this.toggleButtonLabel,
          uploadButtonLabel: this.uploadButtonLabel,
          dropzoneLabel: this.dropzoneLabel
        }
      }).afterClosed().subscribe((files: iUploadedFile[]) => {
        this.uploadComplete.emit(files)
      })
    }
  }

  onSelect(event: any) {
    this.dropedFiles.push(...event.addedFiles)
    this.storage_.files.push(...event.addedFiles);
    // NOTE future property: upload any storage
    // const formData = new FormData();
    // for (var i = 0; i < this._storage.files.length; i++) {
    //   formData.append('file[]', this.files[i]);
    // }
  }

  onRemove(file: any) {
    this.storage_.files.splice(this.storage_.files.indexOf(file), 1);
  }


  async loadFiles() {
    this.storage_.toggleLoading()
    this.uploadedFiles = []
    this.uploadingFiles = true;

    var uploads:any[] = []

    await this.storage_.asyncForEach(this.storage_.files, async (file: any) => {
      uploads.push(
        this.storage_.uploadFile(file, this.path, this.prefixName, this.metadata)
      )
    })

    return this.storage_.fileSubscription = from(uploads)
      .pipe(concatAll<iUploadedFile>())
      .subscribe(
        (fileInfo) => {
          if (fileInfo.uploadedState === true){
            this.cantUploaded = ++this.cantUploaded
            this.uploadedFiles.push(fileInfo)
          }
          if (this.storage_.files.length === this.cantUploaded) {
            this.uploadComplete.emit(this.uploadedFiles)
            this.storage_.uploadComplete$.next(this.uploadedFiles)
            this.storage_.toggleLoading()
            this.storage_.files = []
            this.uploadedFiles = []
            this.cantUploaded = 0
          }
        },
        (err: any) => console.error(err)

      )
  }

  get UploadedPercent(): void | number {
    let percent = (100 / this.storage_.files.length) * this.cantUploaded
    if (percent === 100) {
      this.showDropzone = false
      if (this.storage_.fileSubscription && this.cantUploaded === this.storage_.files.length) {
        this.storage_.fileSubscription.unsubscribe()
        this.storage_.files = []
      }
    }
    else return percent
  }

  ngOnDestroy(): void {
    if (this.storage_.fileSubscription) this.storage_.fileSubscription.unsubscribe()
    if (this.triggerSubscription) this.triggerSubscription.unsubscribe()
  }

}
