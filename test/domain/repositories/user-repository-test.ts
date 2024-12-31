import { UserDataSource } from "../../../src/data/interfaces/data-sources/user-data-source";
import { User } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/interfaces/repositories/user-repository";
import { UserRepositoryImpl } from "../../../src/domain/repositories/user-repository";

class MockUserDataSource implements UserDataSource {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create(user: User): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	getAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
}

describe("User Repository", () => {
	let mockUserDataSource: UserDataSource;
	let userRepository: UserRepository;

	beforeEach(() => {
		jest.clearAllMocks();
		mockUserDataSource = new MockUserDataSource();
		userRepository = new UserRepositoryImpl(mockUserDataSource);
	});

	describe("getAllUsers", () => {
		test("should return data", async () => {
			const expectedData = [
				{
					id: "1",
					email: "test@test.com",
					firstName: "Test",
					createdAt: "2000-01-01T02:00:00.000+00:00",
					updatedAt: "2000-01-01T02:00:00.000+00:00",
				},
			];
			jest.spyOn(mockUserDataSource, "getAll").mockImplementation(() =>
				Promise.resolve(expectedData)
			);
			const result = await userRepository.getUsers();
			expect(result).toBe(expectedData);
		});
	});

	describe("createUser", () => {
		test("should return true", async () => {
			const inputData = { email: "test@test.com", firstName: "Test" };
			jest.spyOn(mockUserDataSource, "create").mockImplementation(() =>
				Promise.resolve(true)
			);
			const result = await userRepository.createUser(inputData);
			expect(result).toBe(true);
		});
	});
});
