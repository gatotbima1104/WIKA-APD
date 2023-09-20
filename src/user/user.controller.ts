import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { EditUserDto } from './dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  createUser(@Body() dto: CreateUserDto, @UploadedFile() file: Express.Multer.File){
    return this.userService.createUser(dto, file)
  }

  @Get()
  getUsers(){
    return this.userService.getUsers()
  }

  @Get(':id')
  getUsersById(@Param('id') id: string){
    return this.userService.getUser(id)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() dto: EditUserDto){
    return this.userService.editUserById(id, dto)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string){
    return this.userService.removeUserById(id)
  }
}
