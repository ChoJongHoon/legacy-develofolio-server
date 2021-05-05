import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserProvider } from './user.enum'
import { User } from './user.model'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(readonly userService: UserService) {}

	@Query(() => User)
	async test(
		@Args('provider', { type: () => UserProvider }) provider: UserProvider,
		@Args('id', { type: () => String }) id: string
	) {
		return this.userService.get({ id, provider })
	}
}
