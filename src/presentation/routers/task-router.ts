import { Request, Response, Router } from "express";
import { GetTaskByUserUseCase } from "@domain/interfaces/use-cases/task/get-task-by-user";

export default function TaskRouter(getTaskByUserUseCase: GetTaskByUserUseCase) {

    const router = Router();

    router.get('/:userId', async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const tasks = await getTaskByUserUseCase.execute(userId);
            res.send(tasks);
        } catch (err) {
            console.error('@err:', err);
            res.status(500).send({ message: "Error fetchin data"});
        }
    });
    
    return router;
}