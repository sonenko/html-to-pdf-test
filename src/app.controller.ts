import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }

  @Post('wkhtmltopdf')
  async postWkhtmltopdf(@Req() request: Request, @Res() res: Response) {
    res.set({
      'Content-Type': 'document/pdf',
    });
    const result = await this.appService.wkhtmltopdfToPdf();
    res.send(result);
  }

  @Post('puppeteer')
  async postPuppeteer(@Req() request: Request, @Res() res: Response) {
    res.set({
      'Content-Type': 'document/pdf',
    });
    const result = await this.appService.puppeteerToPdf();
    res.send(result);
  }

  @Post('puppeteer-template')
  async postPuppeteerTemplate(@Req() request: Request, @Res() res: Response) {
    console.log(request.body);
    const template = request.body.template as string;
    res.set({
      'Content-Type': 'document/pdf',
    });
    const result = await this.appService.puppeteerToPdfFromTemplate(template);
    res.send(result);
  }
}
