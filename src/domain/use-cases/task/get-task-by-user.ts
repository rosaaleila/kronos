import { Task } from "@domain/entities/task";
import { TaskRepository } from "@domain/interfaces/repositories/task-repository";
import { GetTaskByUserUseCase } from "@domain/interfaces/use-cases/task/get-task-by-user";

export class GetTaskByUser implements GetTaskByUserUseCase {
    taskRepository: TaskRepository;
    
    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(userId: string): Promise<Task[]> {
        const result = await this.taskRepository.getTaskByUser(userId);
        return result;
    }
}