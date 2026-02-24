import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyGoal } from './daily-goal.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class DailyGoalService {
  constructor(
    @InjectRepository(DailyGoal)
    private readonly dailyGoalRepo: Repository<DailyGoal>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getGoalsByUser(userId: string): Promise<Record<string, string[]>> {
    const list = await this.dailyGoalRepo.find({
      where: { userId },
      select: ['date', 'taskId'],
    });
    const goals: Record<string, string[]> = {};
    for (const g of list) {
      if (!goals[g.date]) goals[g.date] = [];
      goals[g.date].push(g.taskId);
    }
    return goals;
  }

  async setGoals(userId: string, goals: Record<string, string[]>): Promise<Record<string, string[]>> {
    await this.dailyGoalRepo.delete({ userId });
    for (const [date, taskIds] of Object.entries(goals)) {
      if (!Array.isArray(taskIds) || taskIds.length === 0) continue;
      for (const taskId of taskIds) {
        const task = await this.taskRepo.findOne({ where: { id: taskId, userId } });
        if (!task) continue;
        const row = this.dailyGoalRepo.create({ userId, date, taskId });
        await this.dailyGoalRepo.save(row);
      }
    }
    return this.getGoalsByUser(userId);
  }

  async toggle(userId: string, date: string, taskId: string): Promise<{ added: boolean }> {
    const task = await this.taskRepo.findOne({ where: { id: taskId, userId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    const existing = await this.dailyGoalRepo.findOne({
      where: { userId, date, taskId },
    });
    if (existing) {
      await this.dailyGoalRepo.remove(existing);
      return { added: false };
    }
    const row = this.dailyGoalRepo.create({ userId, date, taskId });
    await this.dailyGoalRepo.save(row);
    return { added: true };
  }
}
