import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class ToggleDailyGoalDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date deve ser YYYY-MM-DD' })
  date: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;
}
