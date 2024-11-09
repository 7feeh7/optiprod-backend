import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/bcrypt.helper';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;

      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (err) {
      throw new InternalServerErrorException("Failed to create the user.");
    }
  }

  async findAll() {
    return await this.userModel.find({}, { password: 0 });
  }

  async findOne(id: string) {
    return await this.userModel.findById({ _id: id }, { password: 0 });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );
  }
}
