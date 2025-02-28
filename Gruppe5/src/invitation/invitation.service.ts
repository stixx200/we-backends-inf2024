import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: Repository<Invitation>,
  ) {}

  async create(invitation: Invitation): Promise<Invitation> {
    return await this.invitationsRepository.save(invitation);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Invitation[]> {
    return await this.invitationsRepository.find();
  }

  async readOne(id: number): Promise<Invitation | null> {
    const result = await this.invitationsRepository.find({
      where: { id },
      relations: {
        event: true,
      },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Invitation>) {
    return await this.invitationsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.invitationsRepository.delete(id);
  }
}
