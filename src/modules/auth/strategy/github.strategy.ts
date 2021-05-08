import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-github'
import { UserProvider } from 'src/modules/user/user.enum'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GITHUB_CLIENT_ID'),
			clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
			callbackURL: 'http://localhost:4000/auth/github/redirect',
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void
	) {
		console.log(`profile`, profile)
		const { id, displayName } = profile
		const user = {
			provider: UserProvider.GITHUB,
			providedId: id,
			username: displayName,
		}

		done(null, user)
	}
}
