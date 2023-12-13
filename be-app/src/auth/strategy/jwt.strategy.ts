import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_AT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { sub } = payload;

    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: {
          id: sub,
        },
      });

      if (!user) {
        throw new ForbiddenException('Invalid token');
      }

      // Append to req.user
      return payload;
    } catch (e) {
      throw e;
    }
  }
}
