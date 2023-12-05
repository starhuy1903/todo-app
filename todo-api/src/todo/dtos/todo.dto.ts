import { IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  status: string;
}
