import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as requestIp from 'request-ip'

async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true })

  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.set('trust proxy', true)
  app.use(requestIp.mw())

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // }));

  const options = new DocumentBuilder()
    .setTitle('AREA API')
    .setDescription('The AREA API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)

  await app.listen(8080)
}
bootstrap()
