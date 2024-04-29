import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponse } from 'src/model/user.model';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseWeb } from 'src/interface/response.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create Member' })
  async register(
    @Body() userDto: CreateUserDto,
  ): Promise<ResponseWeb<UserResponse>> {
    const result = await this.userService.register(userDto);
    const response: ResponseWeb<UserResponse> = {
      status: 'success',
      statusCode: 200,
      message: 'Success retrieve user data',
      data: result,
    };

    return response;
  }

  @Post('bulk-register')
  async registerBulk(
    @Body() usersDto: CreateUserDto[],
  ): Promise<ResponseWeb<UserResponse[]>> {
    const result = await this.userService.bulkRegister(usersDto);
    const response: ResponseWeb<UserResponse[]> = {
      status: 'success',
      statusCode: 200,
      message: 'Success retrieve user data',
      data: result,
    };

    return response;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async fetchAll(): Promise<ResponseWeb<UserResponse[]>> {
    const userResponse = await this.userService.fetchAll();
    const response: ResponseWeb<UserResponse[]> = {
      status: 'success',
      statusCode: 200,
      message: 'Success get list of users',
      data: userResponse,
    };
    return response;
  }
}
