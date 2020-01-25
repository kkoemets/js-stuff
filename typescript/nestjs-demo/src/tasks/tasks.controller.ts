import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {Task, TaskStatus} from './task.model';
import {CreateTaskDto} from './dto/create-task-dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter-dto';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        console.info(`Getting all tasks, query params-${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        console.info(`Starting to get task by id-${id}`);
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.info(`Starting to add task-${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        console.info(`Starting to delete task id-${id}`);
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(@Param('id') id: string, @Body() status: TaskStatus): Task {
        console.info(`Updating task id-${id} to status-${JSON.stringify(status)}`);
        return this.tasksService.updateTaskStatusById(id, status);
    }

}
