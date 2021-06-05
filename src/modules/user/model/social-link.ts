import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class SocialLinks {
	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	github?: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	stackOverflow?: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	facebook?: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	twitter?: string
}
