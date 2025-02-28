import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/achievement/achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService],
})
export class AchievementModule {}
