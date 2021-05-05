import { Injectable } from '@nestjs/common'
import { UserKeyDto } from './user.dto'

@Injectable()
export class UserService {
	async get({ id, provider }: UserKeyDto) {
		return `${provider}:${id}` as const
	}
}
