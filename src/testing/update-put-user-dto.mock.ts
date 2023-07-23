import { Role } from '../enums/role.enum';
import { UpdatePutUserDto } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDto = {
  role: Role.User,
  name: '',
  email: '',
  password: '',
  birthday: '',
};
