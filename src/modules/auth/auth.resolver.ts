import { Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => String)
	async login(@Context() context: any) {
		console.log(`context`, context)
		return ''
	}
}
