import { Injectable } from '@nestjs/common'
import { User, UserKey } from './model/user.model'
import { CreateUserInput } from './model/create-user.input'
import { InjectModel, Model } from 'nestjs-dynamoose'
import { v4 as uuid } from 'uuid'

@Injectable()
export class UserService {
	constructor(
		@InjectModel('user')
		private readonly model: Model<User, UserKey>
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

	async findOrCreate(input: CreateUserInput) {
		let user = (
			await this.model
				.query('providedId')
				.eq(input.providedId)
				.where('provider')
				.eq(input.provider)
				.exec()
		)[0]

		if (!user) {
			user = await this.model.create({
				...input,
				id: uuid(),
				createAt: new Date().toISOString(),
			})
		}

		return user
	}
}
