import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from './calendar/calendar.module';
import { Event } from './calendar/models/event.model';
import { RecurringEventException } from './calendar/models/recurring-event-exception.model';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/models/user.model';

@Module({
  imports: [CalendarModule, UserModule,  
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRESS_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Event, RecurringEventException],
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
