import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';
import { CalendarServiceInterface } from './calendar.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Event, RecurringEventException, User])],
  controllers: [CalendarController],
  providers: [
    { provide: 'CalendarServiceInterface', useClass: CalendarService },
    UserService,
  ],
})
export class CalendarModule {}
