import { User } from "../../../../src/domain/entities/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository";
import { GetAllUsers } from "../../../../src/domain/use-cases/user/get-all-users";

describe("Get All Users Use Case", () => {
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

	test("should return data", async () => {
		const ExpectedResult = [
			{
				id: "1",
				email: "test@test.com",
				firstName: "Test",
				createdAt: "2000-01-01T02:00:00.000+00:00",
				updatedAt: "2000-01-01T02:00:00.000+00:00",
			},
		];

		jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() =>
			Promise.resolve(ExpectedResult)
		);
		const getAllUsersUse = new GetAllUsers(mockUserRepository);
		const result = await getAllUsersUse.execute();
		expect(result).toStrictEqual(ExpectedResult);
	});
});
