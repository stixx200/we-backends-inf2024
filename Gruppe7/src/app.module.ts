import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { HabitModule } from './habit/habit.module';
import { Habit } from './habit/habit.entity';
import { Tag } from './habit/tag.entity';
import { HabitService } from './habit/habit.service';

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
    HabitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly habitService: HabitService,
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"

    const { id: userId } = await this.userService.create(user);

    const habit = new Habit();
    habit.title = 'title';
    habit.description = 'description';
    habit.owner = user;
    habit.isPublic = true;
    habit.frequency = 'daily';
    const tag = new Tag();
    tag.name = 'tag1';
    tag.color = 'blue';
    habit.tags = [tag];

    const { id: habitId } = await this.habitService.create(habit);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const habitRead = await this.habitService.readOne(habitId);
    console.log(inspect(habitRead, true, 10, true));
  }
}
