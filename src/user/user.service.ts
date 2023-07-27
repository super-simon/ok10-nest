import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users = [];
  private salt = 5;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }

    data.password = await this.getHash(data.password);
    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);

    const token = await this.signIn(newUser);

    return { token };
  }

  async getUserAccount(userId: string) {
    const user = this.users.find((user) => user.id === +userId);
    return user;
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async signIn(user) {
    return await this.authService.signIn({ id: user.id });
  }
}
