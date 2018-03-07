import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { IUserRepository } from './repositories/user';
import { UserService } from './services/user';

const container: Container = new Container();

container.bind<IUserRepository>('IUserRepository').toDynamicValue((context: interfaces.Context) => {
    return null;
});

container.bind<UserService>('UserService').to(UserService);

export {
    container,
};
