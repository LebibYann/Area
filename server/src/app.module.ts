import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';

@Module({
  imports: [
    AboutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
