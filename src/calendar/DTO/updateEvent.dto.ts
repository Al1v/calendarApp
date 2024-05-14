
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsIn, IsArray, ArrayMinSize, ValidateNested, ValidateIf } from 'class-validator';
import { User } from 'src/user/models/user.model';

import { CreateEventDto } from './createEvent.dto';

export class UpdateEventDto extends CreateEventDto {

  @IsOptional()
  users: User[]

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsBoolean()
  isInstance: boolean = false;

  @IsOptional()
  @IsDateString()
  newStartDate: Date;

  @IsOptional()
  @IsDateString()
  newEndDate: Date;

  @IsOptional()
  @IsBoolean()
  isCancelled:  boolean = false;
}
