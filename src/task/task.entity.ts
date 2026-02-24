import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20 }) // 'facil' | 'medio' | 'dificil'
  level: string;

  @Column('integer')
  xp: number;

  @Column({ length: 20, default: 'diario' }) // 'diario' | 'semanal' | 'mensal'
  frequency: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
