
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource;

    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }

    async createUser(user: User): Promise<boolean> {
        const result = await this.userDataSource.create(user);
        return result;
    }
    
    async getUsers(): Promise<User[]> {
        const result = await this.userDataSource.getAll();
        return result;
    }
}