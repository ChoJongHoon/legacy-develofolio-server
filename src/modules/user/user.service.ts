import { Injectable } from '@nestjs/common'
import { User, UserKey } from './model/user.model'
import { CreateUserInput } from './model/create-user.input'
import { InjectModel, Model } from 'nestjs-dynamoose'
import { v4 as uuid } from 'uuid'
import { BucketService } from '../bucket/bucket.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel('user')
		private readonly model: Model<User, UserKey>,
		private readonly bucketService: BucketService
	) {}

	create(input: CreateUserInput) {
		return this.model.create({
			...input,
			id: uuid(),
			createAt: new Date().toISOString(),
		})
	}

	findOne(key: UserKey) {
		return this.model.get(key)
	}

	async findOrCreate({ githubId, profile }: CreateUserInput) {
		let user: User
		if (githubId) {
			user = (await this.model.query('githubId').eq(githubId).exec())[0]
		}

		if (!user) {
			const userId = uuid()
			let src: string
			if (profile) {
				const { filename } = await this.bucketService.syncProfileImage(
					profile,
					userId
				)
				src = filename
			}
			user = await this.model.create({
				githubId,
				id: uuid(),
				createAt: new Date().toISOString(),
				profile: src,
			})
		}

		return user
	}

	async getContentById(id: string) {
		const [user] = await this.model
			.query('id')
			.eq(id)
			.attribute('content')
			.exec()

		return user.content
	}

	async setContent(id: string, content) {
		this.model.update({ id }, { content })
	}
}
