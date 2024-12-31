import { MongoDBUserDataSource } from '../../../../src/data/data-sources/mongo-db/mongodb-user-data-source';
import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/data-wrapper';

describe("MongoDB DataSource", () => {

    let mockDatabase: DatabaseWrapper;

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn()
        };
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAll", async () => {
        const ds = new MongoDBUserDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ _id: "123", firstName: "John", email: "john@gmail.com" }]));
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({});
        expect(result).toStrictEqual([{ _id: "123", firstName: "John", email: "john@gmail.com" }]);
    });


    test("create", async () => {
        const ds = new MongoDBUserDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ email: "john@gmail.com" }));
        const result = await ds.create({ firstName: "John", email: "john@gmail.com" });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ firstName: "John", email: "john@gmail.com" });
        expect(result).toStrictEqual(true);
    });

});