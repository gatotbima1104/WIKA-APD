import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/database/typeorm.config';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
