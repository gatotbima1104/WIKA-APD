import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { EditUserDto } from './dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path')

export const storage = {
    storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
      const extention: string = path.parse(file.originalname).ext

      cb(null, `${filename}${extention}`)
    }  
  })
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: './uploads'
    }),
  )
  createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.createUser(dto, file);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('photo', {dest: './uploads'}))
  // uploadFile(@UploadedFile() file){
  //   console.log(file)
  // }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUserById(id, dto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUserById(id);
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

