import {
	Controller,
	Get,
	HttpStatus,
	Post,
	Redirect,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { JwtRefreshGuard } from './guard/jwt-refresh.guard'

@Controller('auth')
export default class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {}

	@Get('/github')
	@UseGuards(AuthGuard('github'))
	public async githubLogin() {
		return HttpStatus.OK
	}

	@Get('/github/redirect')
	@UseGuards(AuthGuard('github'))
	@Redirect()
	public async githubLoginRedirect(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const user = req.user

		const { accessToken } = this.authService.getAccessToken(user.id)

		const {
			refreshToken,
			...refreshOption
		} = this.authService.getCookieWithJwtRefreshToken(user.id)

		res.cookie('refreshToken', refreshToken, refreshOption)

		return {
			url: `${this.configService.get('CLIENT')}/login/success/${accessToken}`,
		}
	}

	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const user = req.user

		const { accessToken } = this.authService.getAccessToken(user.id)

		const {
			refreshToken,
			...refreshOption
		} = this.authService.getCookieWithJwtRefreshToken(user.id)

		res.cookie('refreshToken', refreshToken, refreshOption)

		return {
			accessToken,
		}
	}
}
