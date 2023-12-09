import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterModule } from './modules/counter/counter.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
