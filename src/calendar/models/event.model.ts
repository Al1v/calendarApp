import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../user/models/user.model';
import { RecurringEventException } from './recurring-event-exception.model';

export const ALLOWED_RECURRENCE_PATTERNS = ['daily', 'weekly', 'bi-weekly', 'monthly'];

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => RecurringEventException, exception => exception.event, { cascade: true, onDelete: 'CASCADE' })
  exceptions: RecurringEventException[];

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column({ default: false })
  recurring: boolean;

  @Column({ default: false })
  isCancelled: boolean;

  @Column({ nullable: true })
  recurrencePattern: string | null;
}
