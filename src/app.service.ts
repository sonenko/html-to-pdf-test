import { Injectable } from '@nestjs/common';
import { PDFService } from '@t00nday/nestjs-pdf';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import * as wkhtmltopdf from 'wkhtmltopdf';
import streamToBuffer from './utils/streamToBuffer';
import streamToString from './utils/streamToString';
import { interval, firstValueFrom } from 'rxjs';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  constructor(
    // ...other dependencies...
    private readonly pdfService: PDFService,
  ) {}

  getIndex(): string {
    return 'TODO'; // example usage should be here
  }

  wkhtmltopdfToPdf(): Promise<Buffer> {
    // const contents = fs.readFileSync('./tmp/tiny-template.html', 'utf8');
    const contents = fs.readFileSync('./tmp/template-med.html', 'utf8');
    return streamToBuffer(wkhtmltopdf(contents));
  }

  async puppeteerToPdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const loc = `file://${path.resolve('./tmp/template-med.html')}`;
    await page.goto(loc, {
      waitUntil: 'networkidle2',
    });
    const res = await page.pdf({
      // path: 'hn.pdf',
      format: 'letter',
    });
    await browser.close();
    return res;
  }

  async puppeteerToPdfFromTemplate(template: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(template.length);
    console.log(template);

    // mock
    // const data = fs.readFileSync('./tmp/template-med.html', 'utf8');

    // fs.writeFileSync(
    //   './tmp/template-med.json',
    //   JSON.stringify({ template: data }),
    //   'utf-8',
    // );

    // page.setContent(template, {
    // await page.goto(`file://${path.resolve('./tmp/template-mini.html')}`, {});
    // await page.setContent('<h1>hello</h1>', {
    await page.setContent(template, {});

    const res = await page.pdf({
      format: 'letter',
    });
    await browser.close();
    return res;
  }
}
