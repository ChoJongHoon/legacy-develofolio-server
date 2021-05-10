import { Field, InputType, InterfaceType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserProvider } from '../enum/user-provider.enum'

@InputType()
@InterfaceType('BaseUser')
export class CreateUserInput {
	@IsNotEmpty()
	@IsEnum(UserProvider)
	@Field(/* istanbul ignore next */ () => UserProvider)
	provider: UserProvider

	@IsNotEmpty()
	@IsString()
	@Field(/* istanbul ignore next */ () => String)
	providedId: string
}
