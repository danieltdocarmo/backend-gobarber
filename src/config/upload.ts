import multer, {StorageEngine} from 'multer';
import path from 'path';
import crypto from 'crypto';
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig{
  driver: 'S3' | 'disk';
  multer: {
      storage: StorageEngine
  };

 
  tmpFolder : string;
  uploadsFolder: string;

  config: {
      disk: {

      }
  };
}

export default {
    driver: process.env.STORAGE_DRIVER,
    uploadsFolder: path.resolve(__dirname, 'uploads'),
    tmpFolder: tmpFolder,
    multer:{
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename(_, file, callback){
                    const fileHash = crypto.randomBytes(10).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;
        
                    return callback(null, fileName)
                }
            })
        }
    } as IUploadConfig;
