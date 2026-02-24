import { IsObject } from 'class-validator';

export class UpdateDailyGoalsDto {
  /** Objeto { [date: YYYY-MM-DD]: taskId[] } */
  @IsObject()
  goals: Record<string, string[]>;
}
