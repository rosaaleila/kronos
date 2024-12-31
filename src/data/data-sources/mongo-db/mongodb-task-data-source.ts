import { TaskDataSource } from "@data/interfaces/data-sources/task-data-source";
import { DatabaseWrapper } from "@data/interfaces/data-sources/data-wrapper";
import { Task } from "@domain/entities/task";
import { ObjectId } from "mongodb";

export class MongoDBTaskDataSource implements TaskDataSource {
    private database: DatabaseWrapper;

    constructor(database: DatabaseWrapper) {
        this.database = database;
    }

    async getTaskByUser(userId: string): Promise<Task[]> {
        const objectUserId = new ObjectId(userId);
        const result = (await this.database.find({ user_id: objectUserId }));
        return result;
    }
}