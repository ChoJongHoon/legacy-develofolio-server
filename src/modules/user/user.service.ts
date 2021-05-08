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

	// async get({ id, provider }: UserKeyType): Promise<User> {
	// 	return { id, provider }
	// }

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
}
