import { uuid } from "uuidv4";
import IUserDTO from "../../dtos/IUserDTO";
import User from "../../infra/typeorm/entities/User";
import UserMap from "../../mappers/UserMap";
import IUserRepository from '../IUserRepository';

export default class FakeUserRepository implements IUserRepository{
    private userRepository: User[]= [];
    constructor(){}

    public async findByEmail(email:string): Promise<User | undefined>{
        const findUser = this.userRepository.find(user =>
            user.email == email);

            return findUser;
    }

    public async findById(id: string): Promise<User | undefined>{
        const findUser = this.userRepository.find(user =>
            user.id == id)

            return findUser;
    }

    public async createAndSave(userData: IUserDTO): Promise<User>{
        const user = new User();

        Object.assign(user, {id: uuid(), ...userData})

        this.userRepository.push(user);
    
        return user;
    }

    public async save(userData: User): Promise<void>{
        const findUser = this.userRepository.findIndex(user =>
            user.id === userData.id)

        this.userRepository[findUser] = userData;
    }


}