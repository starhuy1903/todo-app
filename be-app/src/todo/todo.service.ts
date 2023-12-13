import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dtos/todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoStatus } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodoList(ownerId: number) {
    try {
      const todoList = await this.prisma.todo.findMany({
        where: {
          ownerId: ownerId,
        },
      });

      if (todoList.length === 0) {
        throw new NotFoundException('No todos found!');
      }
      return todoList;
    } catch (err) {
      throw err;
    }
  }

  async createTodo(dto: CreateTodoDto, ownerId: number) {
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          title: dto.title,
          ownerId: ownerId,
        },
      });
      return newTodo;
    } catch (err) {
      throw err;
    }
  }

  async updateTodo(todoId: number, dto: TodoDto, ownerId: number) {
    try {
      // Check if the todo exists
      const existingTodo = await this.prisma.todo.findUnique({
        where: { id: todoId, ownerId: ownerId },
      });

      if (!existingTodo) {
        throw new NotFoundException(`Todo with id ${todoId} not found`);
      }

      const statusEnum: TodoStatus =
        TodoStatus[dto.status as keyof typeof TodoStatus];

      // Update the status
      const updatedTodo = await this.prisma.todo.update({
        where: { id: todoId, ownerId: ownerId },
        data: {
          status: statusEnum,
        },
      });

      return updatedTodo;
    } catch (err) {
      throw err;
    }
  }
}
