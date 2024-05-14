import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.model';


@Entity({ name: 'Recurring-event-exceptions' })
export class RecurringEventException {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.exceptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column({ type: 'timestamp', nullable: true })
  newStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  newEndDate: Date;

  @Column({ default: false })
  isCancelled: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;
}
