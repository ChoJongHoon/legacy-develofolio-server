import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'

export type UserKey = {
	id: string
}

@ObjectType({ implements: CreateUserInput })
export class User extends CreateUserInput {
	@Field(/* istanbul ignore next */ () => ID)
	id: string

	@Field(/* istanbul ignore next */ () => String)
	createAt: string
}
