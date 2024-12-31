import server from './server';
import { MongoClient } from 'mongodb';
import UsersRouter from '@presentation/routers/user-router';
import { GetAllUsers } from '@domain/use-cases/user/get-all-users';
import { UserRepositoryImpl } from '@domain/repositories/user-repository';
import { CreateUser } from '@domain/use-cases/user/create-user';
import { DatabaseWrapper } from '@data/interfaces/data-sources/data-wrapper';
import { MongoDBUserDataSource } from '@data/data-sources/mongo-db/mongodb-user-data-source';
import { DB_URL } from '@data/config/env';

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

    server.use("/user", userMiddleWare);
    server.listen(8080, () => console.log("Running on server"));

})();
