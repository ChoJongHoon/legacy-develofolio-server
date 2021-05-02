import {
	HttpException,
	HttpService,
	HttpStatus,
	Injectable,
} from '@nestjs/common'
import { GithubCodeDto } from './auth.dto'

export type GithubUserTypes = {
	githubId: string
	avatar: string
	name: string
	description: string
	location: string
}

export type GithubOAuthResponse = {
	error?: any
	access_token: string
}

export type GithubUserResponse = {
	login: string
	avatar_url: string
	name: string
	bio: string
	company: string
}

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService) {}

	public async getGithubAccessToken(code: string) {
		const getTokenUrl = 'https://github.com/login/oauth/access_token'
		// 깃허브 access token을 얻기위한 요청 API 주소

		const request = {
			code,
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
		}
		// Body에는 Client ID, Client Secret, 웹에서 query string으로 받은 code를 넣어서 전달해주어야 합니다.
		const response = await this.httpService
			.post<GithubOAuthResponse>(getTokenUrl, request, {
				headers: {
					accept: 'application/json', // json으로 반환을 요청합니다.
				},
			})
			.toPromise()

		if (response.data.error) {
			// 에러 발생시
			throw new HttpException(
				'깃허브 인증을 실패했습니다.',
				HttpStatus.UNAUTHORIZED
			)
		}

		const { access_token } = response.data
		// 요청이 성공한다면, access_token 키값의 토큰을 깃허브에서 넘겨줍니다.

		return access_token
	}

	public async getGithubProfile(accessToken: string): Promise<GithubUserTypes> {
		const getUserUrl = 'https://api.github.com/user'

		const { data } = await this.httpService
			.get(getUserUrl, {
				headers: {
					Authorization: `token ${accessToken}`,
				},
			})
			.toPromise()

		const { login, avatar_url, name, bio, company } = data

		const githubInfo: GithubUserTypes = {
			githubId: login,
			avatar: avatar_url,
			name,
			description: bio,
			location: company,
		}

		return githubInfo
	}
}
