import { TaskDataSource } from "@data/interfaces/data-sources/task-data-source";
import { Task } from "@domain/entities/task";
import { TaskRepository } from "@domain/interfaces/repositories/task-repository";

export class TaskRepositoryImpl implements TaskRepository {
    taskDataSource: TaskDataSource;

    constructor(taskDataSource: TaskDataSource) {
        this.taskDataSource = taskDataSource;
    }
    
    async getTaskByUser(userId: string): Promise<Task[]> {
        const result = await this.taskDataSource.getTaskByUser(userId);
        return result;
    }
}