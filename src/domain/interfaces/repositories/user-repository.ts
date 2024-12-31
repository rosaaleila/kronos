import { User } from "@domain/entities/user";

export interface UserRepository {
	createUser(user: User): Promise<boolean>;
	getUsers(): Promise<User[]>;
}
