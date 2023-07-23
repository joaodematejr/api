import { Role } from 'src/enums/role.enum';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  name: 'Teste',
  email: 'teste@gmail.com',
  birthday: '1990-01-01',
  password: '123456',
  role: Role.User,
};
