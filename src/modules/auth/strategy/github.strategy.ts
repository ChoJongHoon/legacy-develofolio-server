import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-github'
import { UserService } from 'src/modules/user/user.service'
import { User } from 'src/modules/user/model/user.model'
import { v4 as uuid } from 'uuid'
import { BucketService } from 'src/modules/bucket/bucket.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly bucketService: BucketService
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
		const { id, photos, profileUrl } = profile

		const avatar = photos.length > 0 ? photos[0].value : undefined

		let user: User

		user = await this.userService.findBy('githubId', id)

		if (!user) {
			const userId = uuid()
			let src: string
			if (avatar) {
				const { filename } = await this.bucketService.syncProfileImage(
					avatar,
					userId
				)
				src = filename
			}
			user = await this.userService.create({
				id: userId,
				githubId: id,
				profile: src,
				socialLinks: { github: profileUrl },
			})
		}

		done(null, user)
	}
}
