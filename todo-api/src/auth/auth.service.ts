import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: UserSignUpDto) {
    const { email, password, name } = dto;

    // Check if the email is already taken
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ForbiddenException('Email already taken');
    }

    // Hash the password
    const hash = await argon.hash(password);

    try {
      // Create the user
      const user = await this.prismaService.user.create({
        data: {
          name: name,
          email,
          password: hash,
        },
      });

      if (!user) {
        throw new Error('Create user failed');
      }

      // Generate access token
      const accessToken = await this.genAccessToken(user.id, user.email);

      delete user.password;

      return {
        user,
        accessToken,
      };

      // Return user's info
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw e;
    }
  }

  async signIn(dto: UserSignInDto) {
    const { email, password } = dto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      if (!(await argon.verify(user.password, password))) {
        throw new ForbiddenException('Wrong password');
      }

      // Generate access token
      const accessToken = await this.genAccessToken(user.id, user.email);

      return {
        accessToken,
      };
    } catch (e) {
      throw e;
    }
  }

  async genAccessToken(userId: number, email: string): Promise<string> {
    const payload: JwtPayloadDto = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_AT_SECRET'),
      expiresIn: '30m',
    });

    return accessToken;
  }
}
