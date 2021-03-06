import { getRepository, Repository, Not } from 'typeorm';
import usersRouter from '../../../http/routes/users.routes';
import IUserRepository from '../../../repositories/IUserRepository';
import User from '../entities/User';

export default class UserRepository implements IUserRepository{
    private userRepository: Repository<User>
    
    constructor(){
        this.userRepository = getRepository(User);
    }

    public async findByEmail(email: string):Promise<User | undefined>{

        const user = await this.userRepository.findOne({where: {email}});

        return user;
    }

    public async findById(user_id: string):Promise<User | undefined>{
        const user = await this.userRepository.findOne(user_id);
        
        return user;
    }

    public async createAndSave(user: User): Promise<User>{
        const response =  this.userRepository.create(user);
        
        await this.userRepository.save(response);

        return response;
    
    }

    public async save(user: User):Promise<void>{
        await this.userRepository.save(user);
    }

    public async listAllUsers(except_user_id?: string): Promise<User[]>{
        let users: User[] = [];
        if(except_user_id){
             users = await this.userRepository.find({
                where: {
                    id: Not(except_user_id)
                }
            })
        }else{
            users = await this.userRepository.find();
        }
        
        return users;
    }

}