import server from './server';
import { MongoClient } from 'mongodb';
import UsersRouter from '@presentation/routers/user-router';
import { GetAllUsers } from '@domain/use-cases/user/get-all-users';
import { UserRepositoryImpl } from '@domain/repositories/user-repository';
import { CreateUser } from '@domain/use-cases/user/create-user';
import { DatabaseWrapper } from '@data/interfaces/data-sources/data-wrapper';
import { MongoDBUserDataSource } from '@data/data-sources/mongo-db/mongodb-user-data-source';
import { DB_URL } from '@data/config/env';
import TaskRouter from '@presentation/routers/task-router';
import { TaskRepositoryImpl } from '@domain/repositories/task-repository';
import { GetTaskByUser } from '@domain/use-cases/task/get-task-by-user';
import { MongoDBTaskDataSource } from '@data/data-sources/mongo-db/mongodb-task-data-source';

(async () => {
    const client: MongoClient = new MongoClient(DB_URL);
    await client.connect();
    const db = client.db("kronos");

    const userDatabaseWrapper: DatabaseWrapper = {
        find: (query) => db.collection("users").find(query).toArray(),
        insertOne: (doc) => db.collection("users").insertOne(doc)
    };

    const userMiddleWare = UsersRouter(
        new GetAllUsers(new UserRepositoryImpl(new MongoDBUserDataSource(userDatabaseWrapper))),
        new CreateUser(new UserRepositoryImpl(new MongoDBUserDataSource(userDatabaseWrapper))),
    );

    const taskDatabaseWrapper: DatabaseWrapper = {
        find: (query) => db.collection("tasks").find(query).toArray(),
        insertOne: (doc) => db.collection("tasks").insertOne(doc)
    };

    const taskMiddleWare = TaskRouter(
        new GetTaskByUser(new TaskRepositoryImpl(new MongoDBTaskDataSource(taskDatabaseWrapper))),
    );

    server.use("/user", userMiddleWare);
    server.use("/task", taskMiddleWare);

    server.listen(8080, () => console.log("Running on server"));

})();
