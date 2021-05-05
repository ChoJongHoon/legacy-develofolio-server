import { Field, ObjectType } from '@nestjs/graphql'
import { UserProvider } from './user.enum'

@ObjectType()
export class User {
	@Field(() => UserProvider)
	provider: UserProvider

	@Field(() => String)
	id: string
}
