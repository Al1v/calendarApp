
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsIn, IsArray, ArrayMinSize, ValidateNested, ValidateIf } from 'class-validator';

import { CreateEventDto } from './createEvent.dto';

export class UpdateEventDto extends CreateEventDto {

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
