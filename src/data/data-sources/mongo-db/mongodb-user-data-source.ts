import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import { DatabaseWrapper } from "@data/interfaces/data-sources/data-wrapper";
import { User } from "@domain/entities/user";

export class MongoDBUserDataSource implements UserDataSource {
    private database: DatabaseWrapper;

    constructor(database: DatabaseWrapper) {
        this.database = database;
    }

    async create(User: User): Promise<boolean> {
        const result = await this.database.insertOne(User);
        return result !== null;
    }

    async getAll(): Promise<User[]> {
        const result = await this.database.find({});
        return result.map(item => ({
            id: item._id.toString(),
            firstName: item.firstName,
            email: item.email,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

}