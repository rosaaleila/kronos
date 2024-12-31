import { User } from "@domain/entities/user";

export interface CreateUserUseCase {
    execute(user: User): Promise<boolean>;
}