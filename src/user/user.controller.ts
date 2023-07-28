import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('list')
  async getUserList() {
    return this.userService.getAllUsers();
  }

  @Post('account/create')
  async createUserAccount(@Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('account/:userId/animal')
  async addAnimalToUser() {
    return 'Animal added';
  }

  @Delete(':userId')
  async deleteUserAccount() {
    return 'User Deleted';
  }

  @Patch(':userId')
  async updateUserAccount() {
    return 'User Updated';
  }

  @Get(':userId')
  async getUserProfile(@Param('userId') id: string) {
    console.log(id);
    return this.userService.getUserAccount(id);
  }
}
