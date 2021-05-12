import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
import { RefreshTokenPayload } from '../interface/token.interface'
import { Request } from 'express'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token'
) {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => request?.cookies?.refreshToken,
			]),
			secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
			passReqToCallback: true,
		})
	}

	async validate(
		req: Request,
		payload: RefreshTokenPayload,
		done: VerifiedCallback
	) {
		try {
			const user = await this.userService.findOne({ id: payload.uid })

			req.user = user

			return done(null, user)
		} catch (error) {
			return done(error)
		}
	}
}
