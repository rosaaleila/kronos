import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { CreateUserUseCase } from "@domain/interfaces/use-cases/user/create-user";

export class CreateUser implements CreateUserUseCase {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<boolean> {
        const result = await this.userRepository.createUser(user);
        return result;
    }
}
