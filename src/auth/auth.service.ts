import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as brcypt from 'bcrypt'
import { JwtPayload } from './jwt/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validatePassword(password: string, hashedPassword: string) {
    return await brcypt.compare(password, hashedPassword);
  }

  async registerUser(dto: CreateUserDto) {
    const user = await this.userRepo.findOne({ 
      where: {
        email: dto.email
      }
    })

    if (user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Email already exist !',
        },
        HttpStatus.CONFLICT,
      );
    }

    const salt = await brcypt.genSalt()
    const hashedPassword = await brcypt.hash(dto.password, salt);

    const newUser = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    const payload: JwtPayload = {
      id: newUser.id,
      role: newUser.role,
    };

    const token = this.jwtService.sign(payload);

    await this.userRepo.save(newUser);
    return {
      newUser,
      message: 'user registered successfully',
      token,
    };
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Email is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await this.validatePassword(dto.password, user.password);

    if (!isMatch) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Password is incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      message: 'Logged in successfully',
    };
  }
}
