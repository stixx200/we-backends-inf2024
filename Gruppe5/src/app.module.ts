import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { InvitationModule } from './invitation/invitation.module';
import { NotificationModule } from './notification/notification.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

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
    EventModule,
    InvitationModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"

    const { id: userId } = await this.userService.create(user);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));
  }
}
