import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsIn, IsArray, ArrayMinSize, ValidateIf } from 'class-validator';
import { User } from '../../user/models/user.model';
import { ALLOWED_RECURRENCE_PATTERNS } from '../models/event.model';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  @IsBoolean()
  recurring: boolean = false;

  @ValidateIf(obj => obj.recurring == true)
  @IsOptional()
  @IsIn(ALLOWED_RECURRENCE_PATTERNS, { message: 'Recurrence pattern must be one of: daily, weekly, bi-weekly, monthly' })
  recurrencePattern: string = '';

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => User)
  users: User[];
}
