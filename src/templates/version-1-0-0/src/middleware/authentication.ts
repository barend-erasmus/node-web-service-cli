import * as express from 'express';

export class AuthenticationMiddleware {

    public static async shouldBeAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {

            next();

        } catch (err) {
            console.log(`${req.url} - 401`);
            res.status(401).end();
        }
    }
}
