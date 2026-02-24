import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Completion } from './completion.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class CompletionService {
  constructor(
    @InjectRepository(Completion)
    private readonly completionRepo: Repository<Completion>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAllByUser(userId: string): Promise<{ date: string; taskId: string }[]> {
    const list = await this.completionRepo.find({
      where: { userId },
      select: ['date', 'taskId'],
    });
    return list.map((c) => ({ date: c.date, taskId: c.taskId }));
  }

  async toggle(userId: string, date: string, taskId: string): Promise<{ added: boolean }> {
    const task = await this.taskRepo.findOne({ where: { id: taskId, userId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    const existing = await this.completionRepo.findOne({
      where: { userId, taskId, date },
    });
    if (existing) {
      await this.completionRepo.remove(existing);
      return { added: false };
    }
    const completion = this.completionRepo.create({ userId, taskId, date });
    await this.completionRepo.save(completion);
    return { added: true };
  }
}
