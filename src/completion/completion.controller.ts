import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CompletionService } from './completion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ToggleCompletionDto } from './dto/toggle-completion.dto';

@Controller('completions')
@UseGuards(JwtAuthGuard)
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Get()
  findAll(@Request() req: { user: { id: string } }) {
    return this.completionService.findAllByUser(req.user.id);
  }

  @Post('toggle')
  toggle(
    @Request() req: { user: { id: string } },
    @Body() dto: ToggleCompletionDto,
  ) {
    return this.completionService.toggle(req.user.id, dto.date, dto.taskId);
  }
}
