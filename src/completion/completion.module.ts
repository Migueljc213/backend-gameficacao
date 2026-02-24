import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Completion } from './completion.entity';
import { Task } from '../task/task.entity';
import { CompletionService } from './completion.service';
import { CompletionController } from './completion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Completion, Task]),
  ],
  controllers: [CompletionController],
  providers: [CompletionService],
  exports: [CompletionService],
})
export class CompletionModule {}
