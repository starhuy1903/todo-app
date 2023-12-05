import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp(@Body() dto: UserSignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  // @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: UserSignInDto) {
    return this.authService.signIn(dto);
  }
}
