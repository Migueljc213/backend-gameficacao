import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyGoal } from './daily-goal.entity';
import { Task } from '../task/task.entity';
import { DailyGoalService } from './daily-goal.service';
import { DailyGoalController } from './daily-goal.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyGoal, Task]),
  ],
  controllers: [DailyGoalController],
  providers: [DailyGoalService],
  exports: [DailyGoalService],
})
export class DailyGoalModule {}
