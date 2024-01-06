import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AboutModule } from './modules/about/about.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import * as path from 'path'
import { EventModule } from './modules/events/event.module'
import { AreaModule } from './modules/area/area.module'

/**
 * AppModule
 * Root module of the application, importing other modules and setting up configurations.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // docker-compose.yml
      host: 'db', // docker-compose.yml
      port: 3306, // docker-compose.yml
      username: 'user', // docker-compose.yml
      password: 'password', // docker-compose.yml
      database: 'db', // docker-compose.yml
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    }),
    AboutModule,
    UsersModule,
    AuthModule,
    EventModule,
    AreaModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
