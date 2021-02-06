import IUserDTO from "../dtos/IUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUserRepository{
    findByEmail(email:string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    createAndSave(user: IUserDTO): Promise<User>;
    save(user: User): Promise<void>;
}