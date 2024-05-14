import { Controller, Get, Post, Put, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/user/DTO/create-user.dto';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { CalendarServiceInterface } from './calendar.service.interface';
import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';

@Controller('calendar')
export class CalendarController {
  constructor(
    @Inject('CalendarServiceInterface') private readonly calendarService: CalendarServiceInterface,
    private readonly userService: UserService
  ) {}

  @Post('users')
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }
  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Post('events')
  async createEvent(@Body() event: CreateEventDto): Promise<Event> {
    return this.calendarService.createEvent(event);
  }

  @Put('events/:id')
  async updateEvent(@Param('id') id: number, @Body() event: UpdateEventDto): Promise<Event | RecurringEventException> {
    return this.calendarService.updateEvent(id, event);
  }

  @Delete('events/:id')
  async deleteEvent(@Param('id') id: number): Promise<void> {
    return this.calendarService.deleteEvent(id);
  }

  @Get('events')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getEventsInRange(@Query('fromDate') fromDate: Date, @Query('toDate') toDate: Date, @Query() query): Promise<Event[] | string> {
    if (!query.fromDate || !query.toDate) {
      throw new HttpException("Both 'fromDate' and 'toDate' are required in the query parameters.", HttpStatus.BAD_REQUEST);
    }

    return this.calendarService.getEventsInRange(fromDate, toDate);
  }
  @Get('events/:id')
  async getEvent(@Param('id') id: number) {
    return this.calendarService.getEvent(id);
  }
}
