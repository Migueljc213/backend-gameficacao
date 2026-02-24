import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../task/task.entity';
import { Completion } from '../completion/completion.entity';
import { DailyGoal } from '../daily-goal/daily-goal.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Completion, (c) => c.user)
  completions: Completion[];

  @OneToMany(() => DailyGoal, (g) => g.user)
  dailyGoals: DailyGoal[];
}
