import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './station/station.module';
@Module({
  imports: [
    StationModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host port
      username: 'root', // username
      password: 'Tlsdnltjd11%', // user password
      database: 'test', // name of our database,
      entities: ['dist/station/entities/*.entity.js'], // add your entities here
      synchronize: true, // if true, TypeORM will automatically create the database schema on application launch
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
