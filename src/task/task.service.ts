import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { getXpByLevel } from './task.constants';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    const xp = getXpByLevel(dto.level);
    const task = this.taskRepo.create({
      userId,
      name: dto.name.trim(),
      level: dto.level,
      xp,
      frequency: dto.frequency || 'diario',
    });
    return this.taskRepo.save(task);
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    return this.taskRepo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    return task;
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.taskRepo.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    await this.taskRepo.remove(task);
  }
}
