import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseWeb } from 'src/interface/response.interface';
import { LoginUserDto, UserResponse } from 'src/model/user.model';
import { AuthService } from './auth.service';
import { Public } from 'src/common/public.decorator';
import { RolesGuard } from './roles.guard';
import { Roles } from 'src/common/roles.decorator';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  async login(
    @Body() userDto: LoginUserDto,
  ): Promise<ResponseWeb<UserResponse>> {
    try {
      const result = await this.authService.login(userDto);
      const response: ResponseWeb<UserResponse> = {
        status: 'success',
        statusCode: 200,
        message: 'Success login',
        data: result,
      };

      return response;
    } catch (error) {
      const response: ResponseWeb<UserResponse> = {
        status: 'failed',
        statusCode: error.status,
        message: error.message,
        data: null,
      };
      throw response;
    }
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(RolesGuard)
  @Roles('user')
  getProfile(@Request() req) {
    try {
      const response: ResponseWeb<UserResponse> = {
        status: 'success',
        statusCode: 200,
        message: 'Success get profile',
        data: req.user,
      };

      return response;
    } catch (error) {
      const response: ResponseWeb<UserResponse> = {
        status: 'failed',
        statusCode: error.status,
        message: error.message,
        data: null,
      };
      throw response;
    }
  }
}
