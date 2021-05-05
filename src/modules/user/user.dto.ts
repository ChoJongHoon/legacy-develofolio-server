import { IsString, IsEnum } from 'class-validator'
import { UserProvider } from './user.enum'

export class UserKeyDto {
	@IsString()
	readonly id: string

	@IsEnum(UserProvider)
	readonly provider: UserProvider
}
