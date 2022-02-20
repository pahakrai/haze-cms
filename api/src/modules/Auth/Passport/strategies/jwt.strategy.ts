import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import common from '@golpasal/common';
import {UnauthorizedException, ForbiddenException} from 'src/core';

// Interfaces & Services
import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {IUserModel} from 'src/modules/User';
import {AuthModel} from '../../interfaces';

const {UserType} = common.type;
const {UserStatus} = common.status;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Auths') private readonly authRepository: AuthModel,
    @InjectModel('Users') private readonly userRepository: IUserModel
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }

  async validate(req: any, jwtpayload: JwtPayload, done: any): Promise<any> {
    try {
      let actions;
      const ac = req.ac;
      const user = await this.userRepository
        .findById(jwtpayload.sub)
        .lean()
        .exec();

      // skip validation for programmatic user
      if (!user?.userTypes.includes(UserType.PROGRAMMATIC)) {
        // find auth that matched with refresh token signature
        const auth = await this.authRepository
          .findOne({
            user: jwtpayload.sub,
            'refreshTokens.token': jwtpayload.refresh
          })
          .lean()
          .exec();

        if (!(user && auth)) {
          throw new Error();
        }
      }

      if (user.status === UserStatus.LOCKED) {
        throw new ForbiddenException({});
      }

      if (user?._id && ac) {
        // append allow/deny actions
        actions = {
          allows: await ac.getUserAllowedActions(
            user.currentWorkspace?.toHexString(),
            user._id.toString()
          ),
          denies: await ac.getUserDeniedActions(
            user.currentWorkspace?.toHexString(),
            user._id.toString()
          )
        };
      }

      return done(null, {...user, actions});
    } catch (error) {
      return done(
        error instanceof ForbiddenException
          ? error
          : new UnauthorizedException({code: 'err_unauthorized'}),
        false
      );
    }
  }
}
