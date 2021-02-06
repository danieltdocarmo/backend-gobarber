import FakeUserRepository from "../repositories/fake/FakeUserRepository";
import UpdateUserAvatar from "./UpdateUserAvatar";
import FakeDiskStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '../../../shared/erros/AppErro';

describe('Update Avatar', ()=>{
    it('should be able to update avatar', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateUserAvatar = new UpdateUserAvatar(fakeUserRepository, fakeDiskStorageProvider);
        
        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@exemple.com', password: '123456'})

        const updatedUser = await updateUserAvatar.execute({user_id: user.id, avatarFileName: 'avatar.jpg'});

        expect(updatedUser.avatar).toBe('avatar.jpg');
    });

    it('not should be able to update avatar', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateUserAvatar = new UpdateUserAvatar(fakeUserRepository, fakeDiskStorageProvider);

        expect(updateUserAvatar.execute({user_id: 'non-existing-user', avatarFileName: 'avatar.jpg'})).rejects.toBeInstanceOf(AppError);
    });

    it('should be delete duplicate files', async ()=>{

        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateUserAvatar = new UpdateUserAvatar(fakeUserRepository, fakeDiskStorageProvider);
        
        const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@exemple.com', password: '123456'})

        await updateUserAvatar.execute({user_id: user.id, avatarFileName: 'avatar.jpg'});

        const updatedUser = await updateUserAvatar.execute({user_id: user.id, avatarFileName: 'avatar2.jpg'});

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(updatedUser.avatar).toBe('avatar2.jpg');
    })
});