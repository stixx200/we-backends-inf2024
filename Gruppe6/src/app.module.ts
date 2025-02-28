import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MatchModule } from './match/match.module';
import { Match } from './match/match.entity';
import { MatchService } from './match/match.service';
import { Message } from './match/message.entity';
import { Interest } from './user/interest.entity';

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
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly matchService: MatchService,
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"
    user.isActive = true;
    const interest = new Interest();
    interest.name = 'hiking';
    user.interests = [interest];

    const match = new Match();
    match.user1 = user;
    match.user2 = user;
    match.matchedAt = new Date();

    const message = new Message();
    message.content = 'hi';
    message.sender = user;
    message.sentAt = new Date();
    match.messages = [message];

    const { id: userId } = await this.userService.create(user);
    const { id: matchId } = await this.matchService.create(match);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const matchRead = await this.matchService.readOne(matchId);
    console.log(inspect(matchRead, true, 10, true));
  }
}
