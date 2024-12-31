import { Task } from "@domain/entities/task";

export interface TaskDataSource {
    getTaskByUser(userId: string): Promise<Task[]>;
}
