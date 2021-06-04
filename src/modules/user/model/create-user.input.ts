import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { SocialLink } from './social-link'

@InputType()
export class CreateUserInput {
	@IsString()
	@Field(/* istanbul ignore next */ () => String)
	id: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	githubId?: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	profile?: string

	@Field(/* istanbul ignore next */ () => [SocialLink], { nullable: true })
	socialLinks?: SocialLink[]
}
