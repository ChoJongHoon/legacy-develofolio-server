import { Field, InputType, InterfaceType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
@InterfaceType('BaseUser')
export class CreateUserInput {
	@IsString()
	@Field(/* istanbul ignore next */ () => String)
	githubId?: string

	@IsString()
	@Field(/* istanbul ignore next */ () => String)
	profile?: string
}
