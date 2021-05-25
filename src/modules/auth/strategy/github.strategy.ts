import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-github'
import { UserProvider } from 'src/modules/user/enum/user-provider.enum'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService
	) {
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
		const { id, photos } = profile

		const avatar = photos.length > 0 ? photos[0].value : undefined

		const user = await this.userService.findOrCreate({
			provider: UserProvider.github,
			providedId: id,
			thumbnail: avatar,
		})

		done(null, user)
	}
}
