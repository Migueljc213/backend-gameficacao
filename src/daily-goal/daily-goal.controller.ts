import { Controller, Get, Put, Post, Body, UseGuards, Request } from '@nestjs/common';
import { DailyGoalService } from './daily-goal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateDailyGoalsDto } from './dto/update-daily-goals.dto';
import { ToggleDailyGoalDto } from './dto/toggle-daily-goal.dto';

@Controller('daily-goals')
@UseGuards(JwtAuthGuard)
export class DailyGoalController {
  constructor(private readonly dailyGoalService: DailyGoalService) {}

  @Get()
  getGoals(@Request() req: { user: { id: string } }) {
    return this.dailyGoalService.getGoalsByUser(req.user.id);
  }

  @Put()
  setGoals(
    @Request() req: { user: { id: string } },
    @Body() dto: UpdateDailyGoalsDto,
  ) {
    return this.dailyGoalService.setGoals(req.user.id, dto.goals);
  }

  @Post('toggle')
  toggle(
    @Request() req: { user: { id: string } },
    @Body() dto: ToggleDailyGoalDto,
  ) {
    return this.dailyGoalService.toggle(req.user.id, dto.date, dto.taskId);
  }
}
