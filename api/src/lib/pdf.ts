import * as pdf from 'html-pdf';
const Q = require('q');
const sizeOf = require('image-size');
/**
 * This function is used to  generate the pdf
 * @param html         html
 * @param footer			footer of the PDF
 * @param header			header of the PDF
 */
export const createPdf = (html, opts) => {
  const {
    footer = {height: '0mm'},
    header = {height: '0mm'},
    format = 'A4'
  } = opts;
  return new Promise((resolve, reject) => {
    const options = {
      format,
      border: '0in',
      orientation: 'portrait',
      header,
      footer,
      height: '10000mm',
      width: '10000mm',
      type: 'png',
      quality: '100'
    };
    const pngDoc = pdf.create(html, options);
    Q.nfcall(pngDoc.toBuffer.bind(pngDoc))
      .then(buffer => {
        const dimensions = sizeOf(buffer);
        options.height = dimensions.height;
        delete options.width;
        options.type = 'pdf';
        const pdfDoc = pdf.create(html, options);
        pdfDoc.toStream((err, stream) => {
          if (err) {
            reject(err);
          }
          resolve(stream);
        });
      })
      .catch(e => reject(e));
  });
};
