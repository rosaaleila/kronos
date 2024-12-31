import { Request, Response, Router } from 'express';
import { CreateUserUseCase } from '@domain/interfaces/use-cases/user/create-user';
import { GetAllUsersUseCase } from '@domain/interfaces/use-cases/user/get-all-users';

export default function UsersRouter(
    getAllUsersUseCase: GetAllUsersUseCase,
    createUserUseCase: CreateUserUseCase
) {
    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const contacts = await getAllUsersUseCase.execute();
            res.send(contacts);
        } catch (err) {
            console.error('@err:', err);
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createUserUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({ message: "Created" });
        } catch (err) {
            console.error('@err:', err);
            res.status(500).send({ message: "Error saving data" });
        }
    });

    return router;
}