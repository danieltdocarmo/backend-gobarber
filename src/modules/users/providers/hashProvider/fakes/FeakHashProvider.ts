import IHashProvider from '../models/IHashProvider';


export default class FakeHashProvider implements IHashProvider {

    public async generateHash(password: string):Promise<string>{
        return password;
    }

    public async compareHash(payload: string, hash: string):Promise<boolean>{
        return payload === hash;
    }

}
