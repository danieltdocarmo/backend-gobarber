import NotificationsDTO from '../../dtos/INotificationDTO';
import Notification from '../typeorm/Notification';

export default interface INotificationsRepository{
    create(data: NotificationsDTO): Promise<Notification>
}