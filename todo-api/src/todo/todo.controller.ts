import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dtos/todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodoList(@Request() request) {
    return this.todoService.getTodoList(request.user.sub);
  }

  @Post()
  createTodo(@Body() dto: CreateTodoDto, @Request() request) {
    console.log('request ', request.user);

    return this.todoService.createTodo(dto, request.user.sub);
  }

  @Put('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TodoDto,
    @Request() request,
  ) {
    return this.todoService.updateTodo(id, dto, request.user.sub);
  }
}
