import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'src/achievement/achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  async create(achievement: Achievement): Promise<Achievement> {
    return await this.achievementRepository.save(achievement);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Achievement[]> {
    return await this.achievementRepository.find();
  }

  async readOne(id: number): Promise<Achievement | null> {
    const result = await this.achievementRepository.find({
      where: { id },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Achievement>) {
    return await this.achievementRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
