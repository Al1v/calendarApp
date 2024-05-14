import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';

describe('CalendarController', () => {

  let service: CalendarService;
  let eventRepository: Repository<Event>;
  let exceptionRepository: Repository<RecurringEventException>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [
        CalendarService,
        { provide: 'CalendarServiceInterface', useClass: CalendarService },
        {
          provide: getRepositoryToken(Event),
          useClass: Repository 
        },
        {
          provide: getRepositoryToken(RecurringEventException), 
          useClass: Repository 
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
        UserService
      ]
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event)); 
    exceptionRepository = module.get<Repository<RecurringEventException>>(getRepositoryToken(RecurringEventException)); 
  });

  describe('get events', () => {
    it('should get Events In Range', async () => {
      const events = [
         {
          id: 73,
          name: 'Sample Event',
          startDate: new Date("2024-05-21T08:00:00.000Z"),
          endDate: new Date("2024-05-21T08:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
        },
        {
          id: 74,
          name: 'Foo',
          startDate:new Date( "2024-05-21T08:00:00.000Z"),
          endDate: new Date( "2024-05-21T23:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
        },
       {
          id: 75,
          name: 'single',
          startDate: new Date("2024-05-21T06:00:00.000Z"),
          endDate: new Date("2024-05-21T12:00:00.000Z"),
          recurring: false,
          isCancelled: false,
          recurrencePattern: 'monthly',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
        }
      ]

      const exceptions = [
        {
          id: 47,
          newStartDate: new Date("2024-05-23T08:00:00.000Z"),
          newEndDate: new Date("2024-05-23T22:00:00.000Z"),
          isCancelled: true,
          startDate: new Date( "2024-05-23T08:00:00.000Z"),
          endDate: new Date("2024-05-23T15:00:00.000Z"),
          event: {
            id: 73,
            name: 'Sample Event',
            startDate: new Date("2024-05-21T08:00:00.000Z"),
            endDate: new Date("2024-05-21T08:00:00.000Z"),
            recurring: true,
            isCancelled: false,
            recurrencePattern: 'daily'
          }
        },
        {
          id: 46,
          newStartDate: new Date("2024-05-22T08:00:00.000Z"),
          newEndDate: new Date("2024-05-22T08:00:00.000Z"),
          isCancelled: true,
          startDate: new Date( "2024-05-22T08:00:00.000Z"),
          endDate: new Date("2024-05-22T08:00:00.000Z"),
          event: {
            id: 73,
            name: 'Sample Event',
            startDate: new Date("2024-05-21T08:00:00.000Z"),
            endDate: new Date("2024-05-21T08:00:00.000Z"),
            recurring: true,
            isCancelled: false,
            recurrencePattern: 'daily'
          }
        }
      ];

      const expectedResult = [
        {
          id: 75,
          name: 'single',
          startDate: new Date("2024-05-21T06:00:00.000Z"),
          endDate: new Date("2024-05-21T12:00:00.000Z"),
          recurring: false,
          isCancelled: false,
          recurrencePattern: 'monthly',
          users: [{ id: 1, name: 'Foo', role: 'user' }]
        },
        {
          id: 73,
          name: 'Sample Event',
          startDate: new Date("2024-05-21T08:00:00.000Z"),
          endDate: new Date("2024-05-21T08:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        },
        {
          id: 73,
          name: 'Sample Event',
          startDate: new Date("2024-05-22T08:00:00.000Z"),
          endDate: new Date("2024-05-22T08:00:00.000Z"),
          recurring: true,
          isCancelled: true,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        },
        {
          id: 73,
          name: 'Sample Event',
          startDate: new Date("2024-05-23T08:00:00.000Z"),
          endDate: new Date("2024-05-23T22:00:00.000Z"),
          recurring: true,
          isCancelled: true,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        },
        {
          id: 74,
          name: 'Foo',
          startDate: new Date("2024-05-21T08:00:00.000Z"),
          endDate: new Date("2024-05-21T08:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        },
        {
          id: 74,
          name: 'Foo',
          startDate: new Date("2024-05-22T08:00:00.000Z"),
          endDate: new Date("2024-05-22T08:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        },
        {
          id: 74,
          name: 'Foo',
          startDate: new Date("2024-05-23T08:00:00.000Z"),
          endDate: new Date("2024-05-23T08:00:00.000Z"),
          recurring: true,
          isCancelled: false,
          recurrencePattern: 'daily',
          users: [{ id: 1, name: 'Foo', role: 'user' }],
          isInstance: true
        }
      ]
      
      jest.spyOn(eventRepository, 'find').mockResolvedValue(events as any);
      jest.spyOn(exceptionRepository, 'find').mockResolvedValue(exceptions as any);

      const result = await service.getEventsInRange(new Date("2024-05-19T21:00:00.000Z"), new Date("2024-05-23T20:59:59.000Z"));

      expect(result).toEqual(expectedResult);
    });
  });
});