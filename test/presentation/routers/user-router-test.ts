import request from "supertest";
import { User } from "../../../src/domain/entities/user";
import { CreateUserUseCase } from "../../../src/domain/interfaces/use-cases/user/create-user";
import { GetAllUsersUseCase } from "../../../src/domain/interfaces/use-cases/user/get-all-users";
import UserRouter from "../../../src/presentation/routers/user-router";
import server from "../../../src/server";

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
    execute(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateUserUseCase implements CreateUserUseCase {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

describe("User Router", () => {
    let mockCreateUserUseCase: CreateUserUseCase;
    let mockGetAllUsersUseCase: GetAllUsersUseCase;

    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
        mockCreateUserUseCase = new MockCreateUserUseCase();
        server.use("/user", UserRouter(mockGetAllUsersUseCase, mockCreateUserUseCase));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /user", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = [
                {
                    id: "1",
                    email: "test@test.com",
                    firstName: "Test",
                    createdAt: "2000-01-01T02:00:00.000+00:00",
                    updatedAt: "2000-01-01T02:00:00.000+00:00",
                },
            ];
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() =>
                Promise.resolve(ExpectedData)
            );

            const response = await request(server).get("/User");

            expect(response.status).toBe(200);
            expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        });

        test("GET /user returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() =>
                Promise.reject(Error())
            );
            const response = await request(server).get("/User");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" });
        });
    });

    describe("POST /user", () => {
        test("POST /user", async () => {
            const InputData = { email: "test@test.com", firstName: "Test" };
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() =>
                Promise.resolve(true)
            );
            const response = await request(server).post("/User").send(InputData);
            expect(response.status).toBe(201);
        });

        test("POST /user returns 500 on use case error", async () => {
            const InputData = { firstName: "Test" };
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() =>
                Promise.reject(Error())
            );
            const response = await request(server).post("/user").send(InputData);
            expect(response.status).toBe(500);
        });
    });
});
