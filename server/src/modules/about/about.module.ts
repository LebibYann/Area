import { Module } from '@nestjs/common'
import { AboutController } from './about.controller'
import { AboutService } from './about.service'

/**
 * AboutModule
 * Module responsible for managing about-related functionalities.
 */
@Module({
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService]
})
export class AboutModule {}
