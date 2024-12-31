import { User } from "@domain/entities/user";

export interface GetAllUsersUseCase { 
    execute(): Promise<User[]>; 
}