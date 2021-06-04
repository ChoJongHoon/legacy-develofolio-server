import { Injectable } from '@nestjs/common'
import { User, UserKey } from './model/user.model'
import { CreateUserInput } from './model/create-user.input'
import { InjectModel, Model, UpdatePartial } from 'nestjs-dynamoose'
import { BucketService } from '../bucket/bucket.service'
import { UpdateUserInput } from './model/update-user.input'

@Injectable()
export class UserService {
	constructor(
		@InjectModel('user')
		private readonly model: Model<User, UserKey>,
		private readonly bucketService: BucketService
	) {}

	findOne(key: UserKey) {
		return this.model.get(key)
	}

	async findBy(by: string, value: any) {
		return (await this.model.query(by).eq(value).exec())[0]
	}

	async create({ id, githubId, profile, socialLinks }: CreateUserInput) {
		return await this.model.create({
			id,
			githubId,
			profile,
			socialLinks,
			createAt: new Date().toISOString(),
		})
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
