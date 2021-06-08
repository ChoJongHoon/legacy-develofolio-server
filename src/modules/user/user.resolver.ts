import { Query, Resolver } from '@nestjs/graphql'
import { User } from './user.model'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User], { name: 'getAllUsers' })
	async getAll() {
		return this.userService.findAll()
	}
}
