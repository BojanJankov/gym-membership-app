import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password/:id')
  changeUserPassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePasswordOnUser(id, updateUserPasswordDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}