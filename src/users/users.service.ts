import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private usersModel: Model<IUsers>) {}

  async create(createUserDto: CreateUserDto): Promise<IUsers> {
    const newUser = await new this.usersModel(createUserDto);
    const salt = await bcrypt.genSalt();

    /**
     * Verify if user already exist
     * if findUsername return true
     * throw ConflictException
     */
    const isUsernameTaken = await this.findUsername(newUser.username);

    if (isUsernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    // Hash user password
    newUser.password = await bcrypt.hashSync(newUser.password, salt);

    return newUser.save();
  }

  /**
   * Find username if exist
   * @param username string
   * @returns false = not exist, true = exist
   */
  async findUsername(username: string): Promise<boolean> {
    const user = await this.usersModel.find({ username }).exec();

    if (user.length <= 0) return false;

    return true;
  }
}
