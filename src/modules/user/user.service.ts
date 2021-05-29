import { Injectable } from '@nestjs/common'
import { User, UserKey } from './model/user.model'
import { CreateUserInput } from './model/create-user.input'
import { InjectModel, Model, UpdatePartial } from 'nestjs-dynamoose'
import { v4 as uuid } from 'uuid'
import { BucketService } from '../bucket/bucket.service'
import { UpdateUserInput } from './model/update-user.input'

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
				id: userId,
				githubId,
				createAt: new Date().toISOString(),
				profile: src,
			})
		}

		return user
	}

	async update(key: UserKey, input: UpdateUserInput) {
		const updateValues: UpdatePartial<User> = {}
		const removeValues: Partial<User> = {}
		for (const key of Object.keys(input) as Array<keyof typeof input>) {
			const value = input[key]
			if (value === null) {
				removeValues[key] = null
			} else {
				updateValues[key] = value
			}
		}
		return await this.model.update(key, {
			...updateValues,
			$REMOVE: removeValues,
		})
	}
}
