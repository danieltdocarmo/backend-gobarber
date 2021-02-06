export default interface IStorageProvider{
    saveFile(path: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}