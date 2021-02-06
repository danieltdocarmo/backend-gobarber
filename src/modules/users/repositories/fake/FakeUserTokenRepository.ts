import IUserTokenRepository from "../IUserTokenRepository";
import UserToken from '../../infra/typeorm/entities/UserToken';
import { uuid } from "uuidv4";

export default class FakeUserTokenRepository implements IUserTokenRepository{
    private userTokens: UserToken[] = [];

    constructor(){}

    public async generate(user_id: string):Promise<UserToken>{   
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined>{
        

        const tokenUser = this.userTokens.find(user =>  user.token == token);

        return tokenUser;
    }
}