
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsIn, IsArray, ArrayMinSize, ValidateNested, ValidateIf } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'company'])
  role: string;
}
