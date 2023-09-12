/* eslint-disable prettier/prettier */

import { NotificationRespository } from "@/domain/notification/application/repositories/notification-repository"
import { Notification } from "@/domain/notification/enterprise/entities/notification"

export default class InMemoryNotificationsRepository implements NotificationRespository {
  public items: Notification[] = []
  
  async create(notification: Notification) {
    this.items.push(notification)
  }



}
