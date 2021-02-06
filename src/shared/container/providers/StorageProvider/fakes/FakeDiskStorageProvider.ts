import IStorageProvider from "../models/IStorageProvider";

export default class FakeDiskStorageProvider implements IStorageProvider{
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string>{
       this.storage.push(file);
        return file;
    }

    public async deleteFile(file:string): Promise<void>{
        const fileIndex = this.storage.findIndex(filePath => filePath === file);
        
        this.storage.splice(fileIndex, 1);

    }
}