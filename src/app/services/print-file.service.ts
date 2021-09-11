import { Injectable } from '@angular/core';
import { MxCache, MxLoading } from '@marxa/devkit';
import { AfiliadosService } from '../public/afiliados/services/afiliados.service';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class PrintFileService {

  filename: string = 'afiliado'
  constructor(
    private _cache: MxCache,
    private _afiliados: AfiliadosService,
    private _loading: MxLoading,
  ) {
    this.getFilename()
  }

  async getFilename(): Promise<string | null> {
    let rfc = this._cache.getDataKey<string>('rfc')
    if (rfc) {
      let afiliado = await this._afiliados.getPerfil( rfc ).toPromise()
      if ( afiliado ) {
        this.filename = afiliado.datos_generales.comercial_nombre
        return this.filename
      } else return null
    } return null

  }

  async downloadPDF(idSelector: string, filename?: string) {
    this._loading.toggleWaiting('open')
    var node = document.getElementById(idSelector) as HTMLElement;
    var image: any;
    var imageData: any;
    if (filename) this.filename = filename

    domtoimage.toPng(node, {bgcolor: '#fff'}).then( async (dataUrl: string) => {

      image = new Image();
      image.src = dataUrl;
      // imageData = image.src

      image.onload = () => {
        var nodeHeight = node.offsetHeight
        var pdfWidth = node.offsetWidth;
        var pdfHeight = Math.ceil( (pdfWidth * 10) / 7)
        var parts = Math.floor( nodeHeight / pdfHeight)
        var rest = nodeHeight % pdfHeight
        var breakpoints: number[] = [pdfHeight];
        var doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);

        while (breakpoints.length < parts) {
          breakpoints.push(pdfHeight * (breakpoints.length + 1))
        }


        breakpoints.forEach((breakpoint: number, index: number) => {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          canvas.width = pdfWidth
          canvas.height = pdfHeight

          if (context) context.drawImage(image,
            0, breakpoint - pdfHeight, pdfWidth, pdfHeight,
            0, 0, pdfWidth, pdfHeight
          )
          doc.addImage(canvas.toDataURL("image/jpeg", 1.0), 'JPG', 0, 0, pdfWidth, pdfHeight);
          doc.addPage([pdfWidth, pdfHeight], 'p')
        })

        if (rest > 0) {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          var lastPart = breakpoints[breakpoints.length - 1]
          canvas.width = pdfWidth
          canvas.height = pdfHeight

          if (context) context.drawImage(image,
            0, lastPart, pdfWidth, rest,
            0, 0, pdfWidth, rest
          )

          doc.addImage(canvas.toDataURL("image/jpeg", 1.0), 'JPG', 0, 0, pdfWidth, pdfHeight);
        }

          // saveAs(imageData, this.filename + '.png');
        doc.save(this.filename + '.pdf')
        this._loading.toggleWaiting('close')

      }



      })
      .catch((error) => {
        console.error(error);
        this._loading.toggleWaiting('close')
      });



  }
}
