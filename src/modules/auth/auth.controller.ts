import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/github')
	@UseGuards(AuthGuard('github'))
	public async githubLogin() {
		return HttpStatus.OK
	}

	@Get('/github/redirect')
	@UseGuards(AuthGuard('github'))
	public async githubLoginRedirect(@Req() req: Request) {
		return {
			statusCode: HttpStatus.OK,
			data: req.user,
		}
	}
}
