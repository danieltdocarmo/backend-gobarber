export default interface IMailProvider{
    generateProvider():Promise<void>;
    sendEmail(to:string, body:string):Promise<void>;

}