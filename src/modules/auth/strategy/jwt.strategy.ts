import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/modules/user/user.service'
import { AccessTokenPayload } from '../interface/token.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private configService: ConfigService,
		private userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
		})
	}

	async validate(payload: AccessTokenPayload, done: VerifiedCallback) {
		const user = await this.userService.findOne({ id: payload.uid })

		if (!user) {
			return done(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED))
		}

		return done(null, user)
	}
}
