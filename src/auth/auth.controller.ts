import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('register')
  registerUser(@Body() dto: CreateUserDto){
    return this.authService.registerUser(dto)
  }

  @Post('login')
  loginUser(@Body() dto: LoginUserDto){
    return this.authService.loginUser(dto)
  }
  
}
