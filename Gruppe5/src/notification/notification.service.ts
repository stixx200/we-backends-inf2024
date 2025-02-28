import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(notification: Notification): Promise<Notification> {
    return await this.notificationsRepository.save(notification);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Notification[]> {
    return await this.notificationsRepository.find();
  }

  async readOne(id: number): Promise<Notification | null> {
    const result = await this.notificationsRepository.find({
      where: { id },
      relations: {},
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Notification>) {
    return await this.notificationsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}
