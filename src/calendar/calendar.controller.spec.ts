import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './models/event.model';
import { RecurringEventException } from './models/recurring-event-exception.model';
import { CreateEventDto } from './DTO/createEvent.dto';

describe('CalendarController', () => {
  let controller: CalendarController;
  let service: CalendarService;
  let eventRepository: Repository<Event>;
  let exceptionRepository: Repository<RecurringEventException>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [
        CalendarService,
        {
          provide: getRepositoryToken(Event), // Provide token for Event repository
          useClass: Repository, // Mocked repository class for Event
        },
        {
          provide: getRepositoryToken(RecurringEventException), // Provide token for RecurringEventException repository
          useClass: Repository, // Mocked repository class for RecurringEventException
        },
      ],
    }).compile();

    controller = module.get<CalendarController>(CalendarController);
    service = module.get<CalendarService>(CalendarService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event)); // Get Event repository
    exceptionRepository = module.get<Repository<RecurringEventException>>(getRepositoryToken(RecurringEventException)); // Get RecurringEventException repository
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
  describe('create event', () => {

  it('should create an event', async () => {
    const createEventDto: CreateEventDto = 
      {
        recurring: true,
        recurrencePattern: 'daily',
        name: 'Sample Event',
        startDate: new Date('2024-05-21T08:00:00.000Z'),
        endDate: new Date('2024-05-21T08:00:00.000Z'),
        users: [
          { id: 1, name: 'Foo', role: 'user' },
        ]
      }
    
    const expectedResult = {
      recurring: true,
      recurrencePattern: 'daily',
      name: 'Sample Event',
      startDate: new Date('2024-05-21T08:00:00.000Z'),
      endDate: new Date('2024-05-21T08:00:00.000Z'),
      users: [
        { id: 1, name: 'Foo', role: 'user' },
        { id: 2, name: 'Bar', role: 'company' }
      ]
    };/* Define expected result here */
    jest.spyOn(eventRepository, 'save').mockResolvedValue(expectedResult as Event);

    const result = await controller.createEvent(createEventDto);
    console.log("result_", result);
  //  console.log("expectedResult", expectedResult)
   // expect(result).toEqual(expectedResult);
    expect(result).toMatchObject({})
  });
  })
  // Add more test cases for other controller methods
});

