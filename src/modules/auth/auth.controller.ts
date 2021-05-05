import { Controller, Get, Query, Redirect } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/github')
	@Redirect()
	public async githubRedirect() {
		return {
			url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.HOST}/auth/github/callback`,
		}
	}

	@Get('/github/callback')
	public async githubCallback(@Query('code') code: string) {
		const accessToken = await this.authService.getGithubAccessToken(code)

		const user = await this.authService.getGithubProfile(accessToken)

		// TODO: client 로 redirect

		return {
			status: 200,
			data: {
				user,
			},
		}
	}
}
