import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO) {
    if (await this.usersRepository.exist({ where: { email: data.email } })) {
      throw new BadRequestException('Esse E-mail already exists');
    } else {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
      const user = this.usersRepository.create(data);
      return this.usersRepository.save(user);
    }
  }

  async list() {
    return this.usersRepository.find();
  }

  async show(id: number) {
    await this.exists(id);
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    { name, email, password, birthday, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);
    password = await bcrypt.hash(password, await bcrypt.genSalt());
    await this.usersRepository.update(id, {
      name,
      email,
      password,
      birthday: birthday ? new Date(birthday) : null,
      role,
    });

    return this.show(id);
  }

  async updatePartial(
    id: number,
    { name, email, password, birthday, role }: UpdatePatchUserDto,
  ) {
    await this.exists(id);
    const data: any = {};
    if (birthday) {
      data.birthDate = new Date(birthday);
    }
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (role) {
      data.role = role;
    }
    this.usersRepository.update(id, data);
    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);
    return this.usersRepository.delete(id);
  }

  async exists(id: number) {
    if (
      this.usersRepository.exist({
        where: { id },
      })
    ) {
      throw new NotFoundException('O usuário não existe');
    }
  }
}
