import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as requestIp from 'request-ip'

/**
 * bootstrap
 * Main function of the server.
 */
async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true })

  /**
   * Enable trust proxy and use request-ip middleware to get client's IP address
   */
  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.set('trust proxy', true)
  app.use(requestIp.mw())

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // }));

  /**
   * Swagger configuration options
   */
  const options = new DocumentBuilder()
    .setTitle('AREA API')
    .setDescription('The AREA API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .build()

  /**
   * Generate Swagger documentation
   */
  const document = SwaggerModule.createDocument(app, options)

  /**
   * Setup Swagger UI at the '/api' endpoint
   */
  SwaggerModule.setup('api', app, document)

  /**
   * Start the application on port 8080
   */
  await app.listen(8080)
}
bootstrap()
