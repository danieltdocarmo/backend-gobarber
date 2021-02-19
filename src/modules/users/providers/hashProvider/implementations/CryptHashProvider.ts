import IHashProvider from '../models/IHashProvider';
import { hash, compare } from 'bcryptjs';

class CryptHashProvider implements IHashProvider {

    public async generateHash(password: string):Promise<string> {
        return hash(password, 8);

    }

    public async compareHash(payload: string, hash: string):Promise<boolean> {
        return compare(payload, hash);


    }


}

export default CryptHashProvider;
