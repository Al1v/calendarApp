import { IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { User } from 'src/user/models/user.model';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends CreateEventDto {
  @IsOptional()
  users: User[];

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
  isCancelled: boolean = false;
}
