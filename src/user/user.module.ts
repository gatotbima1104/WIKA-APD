import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
