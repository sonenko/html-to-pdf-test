import { Module } from '@nestjs/common';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PDFModule.register({
      view: {
        root: 'pdf-template',
        engine: 'pug',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
