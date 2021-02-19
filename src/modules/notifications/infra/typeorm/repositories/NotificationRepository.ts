import { getMongoRepository, MongoRepository } from "typeorm";
import INotificationDTO from "../../../dtos/INotificationDTO";
import INotificationsRepository from "../../repositories/INotificationRepository";
import Notification from "../Notification";

export default class NotificationRepository implements INotificationsRepository {
    private dbRepository: MongoRepository<Notification>;
    constructor() {
        this.dbRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ recipient_id, content }: INotificationDTO): Promise<Notification> {
        const notification = await this.dbRepository.create({
            recipient_id,
            content
        });

        await this.dbRepository.save(notification);

        return notification;

    }
}