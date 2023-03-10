import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private usersModel: Model<IUsers>) {}

  /**
   * User creation service
   * @param createUserDto object payload
   * @returns user object
   */
  async create(createUserDto: CreateUserDto): Promise<any> {
    const newUser = await new this.usersModel(createUserDto);
    const salt = await bcrypt.genSalt();

    // Hash user password
    newUser.password = await bcrypt.hashSync(newUser.password, salt);

    await newUser.save();

    return this.sanitizeUser(newUser);
  }

  /**
   * Find username if exist
   * @param username string
   * @returns user object or null
   */
  async findUsername(username: string): Promise<any> {
    const user = await this.usersModel.findOne({ username }).exec();

    return user;
  }

  /**
   * Find user service
   * @param id string ObjectId
   * @returns user object
   */
  async findOne(id: string) {
    const user = await this.usersModel.findById(id);

    return user;
  }

  /**
   * Find by id & update user data service
   * @param id string ObjectId
   * @param updateUserDto payload data
   * @returns user object
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // set new: true to return data after update applied
    const user = await this.usersModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return user;
  }

  sanitizeUser(user: IUsers) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
