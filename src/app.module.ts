import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { Completion } from './completion/completion.entity';
import { DailyGoal } from './daily-goal/daily-goal.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CompletionModule } from './completion/completion.module';
import { DailyGoalModule } from './daily-goal/daily-goal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_PATH || 'data/trilha.db',
      entities: [User, Task, Completion, DailyGoal],
      synchronize: false,
      migrations: [__dirname + '/migrations/*.js'],
      migrationsRun: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    CompletionModule,
    DailyGoalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
