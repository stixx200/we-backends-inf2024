import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAchievement } from 'src/user/user-achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAchievementService {
  constructor(
    @InjectRepository(UserAchievement)
    private userAchievementsRepository: Repository<UserAchievement>,
  ) {}

  async create(userAchievement: UserAchievement): Promise<UserAchievement> {
    return await this.userAchievementsRepository.save(userAchievement);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<UserAchievement[]> {
    return await this.userAchievementsRepository.find();
  }

  async readOne(id: number): Promise<UserAchievement | null> {
    const result = await this.userAchievementsRepository.find({
      where: { id },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<UserAchievement>) {
    return await this.userAchievementsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.userAchievementsRepository.delete(id);
  }
}
