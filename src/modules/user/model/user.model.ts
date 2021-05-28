import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'
import GraphQLJSON from 'graphql-type-json'

export type UserKey = {
	id: string
}

@ObjectType({ implements: CreateUserInput })
export class User extends CreateUserInput {
	@Field(/* istanbul ignore next */ () => ID)
	id: string

	@Field(/* istanbul ignore next */ () => String)
	createAt: string

	@Field(/* istanbul ignore next */ () => GraphQLJSON, { nullable: true })
	content?: any
}
