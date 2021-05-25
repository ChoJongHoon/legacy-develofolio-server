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

	async findOrCreate({ providedId, provider, thumbnail }: CreateUserInput) {
		let user = (
			await this.model
				.query('providedId')
				.eq(providedId)
				.where('provider')
				.eq(provider)
				.exec()
		)[0]

		if (!user) {
			const userId = uuid()
			let avatar: string
			if (thumbnail) {
				const { filename } = await this.bucketService.syncProfileImage(
					thumbnail,
					userId
				)
				avatar = filename
			}
			user = await this.model.create({
				providedId,
				provider,
				id: uuid(),
				createAt: new Date().toISOString(),
				thumbnail: avatar,
			})
		}

		return user
	}
}
