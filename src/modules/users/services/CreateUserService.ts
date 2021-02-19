
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import UserMap from '../mappers/UserMap';
import AppErro from '../../../shared/erros/AppErro';
import IUserRepository from '../repositories/IUserRepository';

interface Request{
    name: string;
    email: string;
    password: string;
}
export default class CreateUserService{
    constructor(private usersRepository: IUserRepository, private bcryptHashProvider: IHashProvider){
    }

    public async execute({name, email, password}: Request): Promise<Omit<User, 'password'>>{


        const findSameEmail = await this.usersRepository.findByEmail(email);

        if(findSameEmail){
            throw new AppErro('Email já cadastrado!');
        }
        const hashedPassword = await this.bcryptHashProvider.generateHash(password);

        const user = await this.usersRepository.createAndSave({name, email, password: hashedPassword});

        const userWithoutPassword = UserMap.toDTO(user);

        return userWithoutPassword;
        
    }
}