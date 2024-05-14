import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Res,
  HttpException
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateEventDto } from './DTO/createEvent.dto';
import { UpdateEventDto } from './DTO/updateEvent.dto';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';
import express, { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

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
