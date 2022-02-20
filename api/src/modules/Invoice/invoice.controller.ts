import {
  Get,
  Post,
  Param,
  Controller,
  UseFilters,
  Response,
  UseInterceptors
} from '@nestjs/common';
import {InvoiceService} from './invoice.service';
import {
  BypassSecretGuard,
  BaseController,
  HttpExceptionFilter,
  ProgrammaticAPI
} from 'src/core';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Controller('invoices')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class InvoiceController extends BaseController {
  constructor(private readonly invoiceService: InvoiceService) {
    super();
  }

  /**
   * send create order email notification to user
   *  @param orderId
   */
  @ProgrammaticAPI()
  @Post('/:_id/notification/:receiptNo')
  public async sendOrderCreateNotification(@Param() param) {
    await this.invoiceService.sendOrderCreateNotification(
      param._id,
      param.receiptNo
    );
  }

  @Get('/:_id/preview-pdf/:fileName')
  public async previewInvoicePdf(@Response() res, @Param() param) {
    const {pdfStream} = await this.invoiceService.downloadInvoicePdf(param._id);
    res.header('Content-type', 'application/pdf');
    res.header('Content-Disposition', 'inline');
    return pdfStream.pipe(res);
  }

  @Get('/:_id/download-pdf/:receiptNo')
  public async downloadReceiptPdf(@Response() res, @Param() param) {
    const {pdfStream} = await this.invoiceService.getReceiptPdf(
      param._id,
      param.receiptNo
    );

    res.header('Content-Type', 'application/pdf');
    res.header(
      'Content-Disposition',
      `attachment; filename=${param.receiptNo}.pdf`
    );
    return pdfStream.pipe(res);
  }

  @BypassSecretGuard()
  @Get('/:_id/download-email-pdf/:receiptNo/:utcOffset')
  public async downloadEmailInvoicePdf(@Response() res, @Param() param) {
    const {pdfStream} = await this.invoiceService.getReceiptPdf(
      param._id,
      param.receiptNo,
      parseInt(param.utcOffset, 10)
    );
    res.header('Content-Type', 'application/pdf');
    res.header(
      'Content-Disposition',
      `attachment; filename=${param.receiptNo}.pdf`
    );
    return pdfStream.pipe(res);
  }

  @Get('/:_id/download-invoice-pdf')
  public async downloadInvoicePdf(@Response() res, @Param() param) {
    const {pdfStream, orderNo} = await this.invoiceService.downloadInvoicePdf(
      param._id
    );
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename=${orderNo}.pdf`);
    return pdfStream.pipe(res);
  }
}
