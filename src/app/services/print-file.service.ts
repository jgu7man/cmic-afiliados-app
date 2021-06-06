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
    let rfc = this._cache.getDataKey<string>('rfc')
    if (rfc) {
      this._afiliados.getPerfil(rfc).subscribe(afiliado => {
        if (afiliado) this.filename = afiliado.datos_generales.comercial_nombre
      })
    }
   }

  async downloadPDF() {
    var node = document.getElementById('perfil-view') as HTMLElement;
    var image: any;
    var imageData: any;

    domtoimage.toPng(node).then( async (dataUrl: string) => {

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

      }



      })
      .catch(function(error) {
        console.error(error);
      });



  }
}
