import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { CalendarServiceInterface } from './calendar.service.interface';
import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';


type EventInstance = Event & { isInstance: boolean };

@Injectable()
export class CalendarService implements CalendarServiceInterface {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(RecurringEventException)
    private readonly exceptionRepository: Repository<RecurringEventException>
  ) {}

  async createEvent(event: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save(event);
  }

  async getEvent(id: number): Promise<Event> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async updateEvent(eventId: number, updatedEvent: UpdateEventDto): Promise<RecurringEventException | Event> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if(!event){
      throw new HttpException("event not found", HttpStatus.NOT_FOUND)
    }
    if (updatedEvent.isInstance) {
      const exceptionInstance = await this.exceptionRepository.findOne({
        where: {
          event: { id: eventId },
          startDate: new Date(updatedEvent.startDate)
        }
      });
      if (exceptionInstance) {
        Object.assign(exceptionInstance, updatedEvent);
        return await this.exceptionRepository.save({
          ...exceptionInstance,
          event: event
        });
      }

      const newExceptionInstance = await this.exceptionRepository.save({
        ...updatedEvent,
        event: event
      });
      return newExceptionInstance;
    }
    const eventToUpdate = await this.eventRepository.findOne({
      where: { id: eventId }
    });

    if (!eventToUpdate) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    Object.assign(eventToUpdate, updatedEvent);
    const updatedEventEntity = await this.eventRepository.save(eventToUpdate);
    return updatedEventEntity;
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.eventRepository.delete(eventId);
  }

  async getEventsInRange(fromDate: Date, toDate: Date): Promise<Event[]> {

      const allEvents = await this.eventRepository.find({
        where: [{ startDate: Between(fromDate, toDate) }, { endDate: Between(fromDate, toDate), },   { 
          startDate: LessThan(fromDate), // Events starting before or on fromDate
          recurring: true
        }, ]
      });
   

      const recurringEventExceptions = await this.exceptionRepository.find({
        where: [{ newStartDate: Between(fromDate, toDate) }, { newEndDate: Between(fromDate, toDate) }],
        relations: ['event']
      });
      const nonRecurringEvents = allEvents.filter(event => !event.recurring);
      const recurringEvents = allEvents.filter(event => event.recurring);
      const recurringEventInstances: Event[] = [];

      recurringEvents.forEach(event => {
        const instances = this.calculateRecurringEventInstances(event, fromDate, toDate, recurringEventExceptions);

        recurringEventInstances.push(...instances);
      });

      const uniqueEvents = [...nonRecurringEvents, ...recurringEventInstances];
      return uniqueEvents;
  }

  private calculateRecurringEventInstances(event: Event, fromDate: Date, toDate: Date, exceptions: RecurringEventException[]): Event[] {
    const instances: Event[] | EventInstance = [];

    let currentDate = new Date(event.startDate > fromDate ? event.startDate : fromDate);

    while (currentDate <= toDate) {
      if (this.matchesRecurrencePattern(event, currentDate)) {
        const exception = this.isExceptionDate(currentDate, exceptions, event.id);
        const newInstance: EventInstance = {
          ...event,
          isInstance: true,
          startDate: new Date(exception ? exception.newStartDate : currentDate),
          endDate: new Date(exception ? exception.newEndDate : currentDate),
          isCancelled: exception ? exception.isCancelled : event.isCancelled
        };
        instances.push(newInstance);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return instances;
  }

  private matchesRecurrencePattern(event: Event, date: Date): boolean {
    switch (event.recurrencePattern) {
      case 'daily':
        return true;
      case 'weekly':
        return date.getDay() === event.startDate.getDay();
      case 'bi-weekly':
        return date.getDay() === event.startDate.getDay() && Math.floor((date.getDate() - event.startDate.getDate()) / 7) % 2 === 0;
      case 'monthly':
        return date.getDate() === event.startDate.getDate();
      default:
        return false;
    }
  }

  private isExceptionDate(date: Date, exceptions: RecurringEventException[], eventId: number): RecurringEventException {
    return exceptions.find(exception => exception.newStartDate.toDateString() === date.toDateString() && exception.event?.id == eventId);
  }
}
