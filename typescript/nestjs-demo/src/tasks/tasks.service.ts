import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import * as uuid from 'uuid/v1';
import {CreateTaskDto} from './dto/create-task-dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter-dto';

const fs = require('fs');

@Injectable()
export class TasksService {
    private _ALL_TASKS: string = 'tasks.json';

    getTasks(filterDto: GetTasksFilterDto): Task[] {
        return Object.keys(filterDto).length > 0 ? this._getTasksFiltered(filterDto) : this._getAllTasks();
    }

    getTaskById(id: string): Task {
        const task: Task = this._getAllTasks().find((task: Task) => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with id-${id} not found`)
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto) {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        return this._saveTask(task);
    }

    deleteTask(id: string) {
        const taskToDelete: Task = this.getTaskById(id);
        this._saveTasks(this._getAllTasks().filter((task: Task) => task.id !== taskToDelete.id));
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task {
        const taskToUpdate: Task = this.getTaskById(id);
        this.deleteTask(id);

        const updatedTask: Task = {...taskToUpdate, status};
        this._saveTask(updatedTask);

        return updatedTask;
    }

    private _getAllTasks(): Task[] {
        const allTasks = () => {
            let allTasks: Task[] = [];

            try {
                allTasks = JSON.parse(fs.readFileSync(this._ALL_TASKS));
            } catch (e) {
                console.warn(`Did not find file-${this._ALL_TASKS}`);
            }

            return allTasks;
        };

        return allTasks();
    }

    private _getTasksFiltered(filterDto: GetTasksFilterDto): Task[] {
        const {search, status} = filterDto;
        return this._getAllTasks()
            .filter((task: Task) => !status || task.status === status)
            .filter((task: Task) => !search || task.description.includes(search) || task.title.includes(search));
    }

    private _saveTask(task: Task) {
        this._saveTasks([...this._getAllTasks(), task]);
        return task;
    }

    private _saveTasks(tasks: Task[]) {
        fs.writeFileSync(this._ALL_TASKS, JSON.stringify(tasks));
    }

}
