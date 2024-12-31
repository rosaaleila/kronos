import { Task } from "@domain/entities/task";

export interface GetTaskByUserUseCase {
    execute(userId: string): Promise<Task[]>;
}