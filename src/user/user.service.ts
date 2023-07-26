import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  async getAllUsers() {
    return this.users;
  }

  async createUser(data: any) {
    return this.users.push(data);
  }

  async getUserAccount(userId: string) {
    const user = this.users.find((user) => user.id === +userId);
    return user;
  }

  //delete
  //update
}
