import { User } from "../../../../src/domain/entities/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository";
import { CreateUser } from '../../../../src/domain/use-cases/user/create-user';

describe("Create User Use Case", () => {
    class MockUserRepository implements UserRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createUser(user: User): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        getUsers(): Promise<User[]> {
            throw new Error("Method not implemented.");
        }
    }

    let mockUserRepository: UserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });

    test("should return true", async () => {
        const InputData = { email: 'test@test.com', firstName: "Test" };

        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true));
        const createUserUseCase = new CreateUser(mockUserRepository);
        const result = await createUserUseCase.execute(InputData);
        expect(result).toBe(true);

    });

});