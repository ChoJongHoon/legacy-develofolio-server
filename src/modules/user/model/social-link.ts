import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class SocialLink {
	@IsString()
	@Field(/* istanbul ignore next */ () => String)
	name: string

	@Field(/* istanbul ignore next */ () => String)
	link: string
}
