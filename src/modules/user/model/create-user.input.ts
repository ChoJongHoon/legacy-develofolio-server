import { Field, InputType, InterfaceType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserProvider } from '../user.enum'

@InputType()
@InterfaceType('BaseUser')
export class CreateUserInput {
	@IsNotEmpty()
	@IsEnum(UserProvider)
	@Field(/* istanbul ignore next */ () => UserProvider)
	provider: UserProvider

	@IsNotEmpty()
	@IsString()
	@Field()
	username: string
}
