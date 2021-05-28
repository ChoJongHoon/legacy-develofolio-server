import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './model/user.model'
import { UserService } from './user.service'
import { CreateUserInput } from './model/create-user.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { CurrentUser } from './decorator/current-user.decorator'
import { UpdateUserInput } from './model/update-user.input'

@Resolver()
export class UserResolver {
	constructor(readonly userService: UserService) {}

	@Query(/* istanbul ignore next */ () => User)
	user(@Args('id', { type: /* istanbul ignore next */ () => ID }) id: string) {
		return this.userService.findOne({ id })
	}

	@Mutation(/* istanbul ignore next */ () => User)
	createUser(@Args('input') input: CreateUserInput) {
		return this.userService.create(input)
	}

	@Mutation(/* istanbul ignore next */ () => User)
	@UseGuards(GqlAuthGuard)
	updateUser(@CurrentUser() user: User, @Args('input') input: UpdateUserInput) {
		return this.userService.update({ id: user.id }, input)
	}

	@Query(/* istanbul ignore next */ () => User)
	@UseGuards(GqlAuthGuard)
	me(@CurrentUser() user: User) {
		return user
	}
}
