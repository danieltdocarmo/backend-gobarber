export default interface IHashProvider{
    compareHash(payload: string, hash: string): Promise<boolean>;
    
    generateHash(password: string):Promise<string>;
    
    


}