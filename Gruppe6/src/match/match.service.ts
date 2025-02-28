import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchsRepository: Repository<Match>,
  ) {}

  async create(match: Match): Promise<Match> {
    return await this.matchsRepository.save(match);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Match[]> {
    return await this.matchsRepository.find();
  }

  async readOne(id: number): Promise<Match | null> {
    const result = await this.matchsRepository.find({
      where: { id },
      relations: {
        user1: true,
        user2: true,
        messages: { sender: true },
      },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Match>) {
    return await this.matchsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.matchsRepository.delete(id);
  }
}
