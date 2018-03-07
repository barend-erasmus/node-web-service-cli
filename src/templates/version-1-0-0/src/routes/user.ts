import * as express from 'express';
import { User } from '../entities/user';
import { container } from '../ioc';
import { UserService } from '../services/user';

export class UserRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const result: User = await container.get<UserService>('UserService').find(req.query.userName);

            res.json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
