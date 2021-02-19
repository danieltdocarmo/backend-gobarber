import {ObjectID} from 'typeorm';

import INotificationDTO from "../../../dtos/INotificationDTO";
import INotificationsRepository from "../INotificationRepository";
import Notification from '../../typeorm/Notification';

export default class FakeNotificationsRepository implements INotificationsRepository{
    private notifications: Notification[] = [];

    public async create({recipient_id,content}:INotificationDTO):Promise<Notification>{
        const notification = new Notification();

        Object.assign(notification, {id: new ObjectID, recipient_id, content});

        this.notifications.push(notification);

        return notification;
    }
}