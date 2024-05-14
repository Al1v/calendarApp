import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';

export interface CalendarServiceInterface {
  createEvent(event: CreateEventDto): Promise<Event>;
  getEvent(id: number): Promise<Event>;
  updateEvent(eventId: number, updatedEvent: UpdateEventDto): Promise<Event | RecurringEventException>; // Updated return type
  deleteEvent(eventId: number): Promise<void>;
  getEventsInRange(fromDate: Date, toDate: Date): Promise<Event[]>;
}