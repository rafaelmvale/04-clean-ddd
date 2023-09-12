import { Notification } from '../../enterprise/entities/notification'

export interface NotificationRespository {
  create(notification: Notification): Promise<void>
}
