import { IsString, IsIn, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsIn(['facil', 'medio', 'dificil'])
  level: string;

  @IsString()
  @IsOptional()
  @IsIn(['diario', 'semanal', 'mensal'])
  frequency?: string;
}
