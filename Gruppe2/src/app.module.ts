import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { Achievement } from './achievement/achievement.entity';
import { AchievementModule } from './achievement/achievement.module';
import { AchievementService } from './achievement/achievement.service';
import { UserAchievement } from './user/user-achievement.entity';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarEvent } from './calendar/calendar-event.entity';
import { CalendarService } from './calendar/calendar.service';
import { InvitedUser } from './calendar/invited-user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    UserModule,
    AchievementModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly achievementService: AchievementService,
    private readonly calendarService: CalendarService,
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const achievement = new Achievement();
    achievement.name = 'a1';
    achievement.description = 'desc';

    const userAchievement = new UserAchievement();
    userAchievement.achievedAt = new Date();
    userAchievement.achievement = achievement;

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"
    user.achievements = [userAchievement];

    const invitedUser = new InvitedUser();
    invitedUser.user = user;
    const calendarEvent = new CalendarEvent();
    calendarEvent.title = 'event1';
    calendarEvent.description = 'desc';
    calendarEvent.start = new Date();
    calendarEvent.end = new Date();
    calendarEvent.createdBy = user;
    calendarEvent.invitedUsers = [invitedUser];

    const { id: achievementId } =
      await this.achievementService.create(achievement);
    const { id: userId } = await this.userService.create(user);
    const { id: calendarEventId } =
      await this.calendarService.createEvent(calendarEvent);

    const achievementRead =
      await this.achievementService.readOne(achievementId);
    console.log(inspect(achievementRead, true, 10, true));

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const calendarEventRead =
      await this.calendarService.readOneEvent(calendarEventId);
    console.log(inspect(calendarEventRead, true, 10, true));
  }
}
