import { Task } from "@domain/entities/task";

export interface TaskRepository {
    getTaskByUser(userId: string): Promise<Task[]>;
}