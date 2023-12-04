import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dtos/todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodoList() {
    return this.todoService.getTodoList();
  }

  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Put('/:id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body() dto: TodoDto) {
    return this.todoService.updateTodo(id, dto);
  }
}
