import { NextFunction, Response } from 'express';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';
import { IRequest } from '../types/context';
import { validatorDto } from '../utils/class-validator';

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async update(req: IRequest, res: Response, next: NextFunction) {
    try {
      const updateUserDto = new UpdateUserDto(req.body);

      await validatorDto(updateUserDto);

      const response = await this.userService.updateUser(req.user_id, updateUserDto);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
