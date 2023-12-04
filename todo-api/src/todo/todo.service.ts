import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dtos/todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodoList() {
    try {
      const todoList = await this.prisma.todo.findMany();

      if (todoList.length === 0) {
        throw new NotFoundException('No todos found!');
      }
    } catch (err) {
      throw err;
    }
  }

  async createTodo(dto: CreateTodoDto) {
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          title: dto.title,
        },
      });
      return newTodo;
    } catch (err) {
      throw err;
    }
  }

  async updateTodo(id: number, dto: TodoDto) {
    try {
      // Check if the todo exists
      const existingTodo = await this.prisma.todo.findUnique({
        where: { id },
      });

      if (!existingTodo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }

      // Update the status
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data: {
          status: dto.status,
        },
      });

      return updatedTodo;
    } catch (err) {
      throw err;
    }
  }
}
