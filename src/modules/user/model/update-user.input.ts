import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class UpdateUserInput {
	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	profile?: string | null

	@Field(/* istanbul ignore next */ () => GraphQLJSON, { nullable: true })
	content?: any | null
}
