import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import {
	AccessTokenPayload,
	RefreshTokenPayload,
} from './interface/token.interface'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	public getCookieWithJwtAccessToken(uid: string) {
		const payload: AccessTokenPayload = { uid }
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: `${this.configService.get(
				'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
			)}s`,
		})

		return {
			accessToken: token,
			domain: 'localhost',
			path: '/',
			httpOnly: true,
			maxAge:
				Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) *
				1000,
		}
	}

	public getCookieWithJwtRefreshToken(uid: string) {
		const payload: RefreshTokenPayload = { uid }
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: `${this.configService.get(
				'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
			)}s`,
		})

		return {
			refreshToken: token,
			domain: 'localhost',
			path: '/',
			httpOnly: true,
			maxAge:
				Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
				1000,
		}
	}

	getCookiesForLogOut() {
		return {
			accessOption: {
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				maxAge: 0,
			},
			refreshOption: {
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				maxAge: 0,
			},
		}
	}
}
