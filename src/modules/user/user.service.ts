import { Injectable } from '@nestjs/common'
import { UserProvider } from './user.enum'
import { User } from './user.model'

type UserKeyType = {
	provider: UserProvider
	id: string
}
@Injectable()
export class UserService {
	async get({ id, provider }: UserKeyType): Promise<User> {
		return { id, provider }
	}
}
