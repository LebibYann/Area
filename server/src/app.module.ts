import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterModule } from './modules/counter/counter.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // docker-compose.yml
      host: 'db', // docker-compose.yml
      port: 3306, // docker-compose.yml
      username: 'user', // docker-compose.yml
      password: 'password', // docker-compose.yml
      database: 'db', // docker-compose.yml
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AboutModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
