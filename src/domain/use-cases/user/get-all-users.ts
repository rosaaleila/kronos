import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { GetAllUsersUseCase } from "@domain/interfaces/use-cases/user/get-all-users";

export class GetAllUsers implements GetAllUsersUseCase {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    };

    async execute(): Promise<User[]> {
        const result = await this.userRepository.getUsers();
        return result;
    };
};