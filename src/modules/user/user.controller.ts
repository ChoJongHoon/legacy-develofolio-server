import { Controller, Get, Param } from '@nestjs/common'
import { UserProvider } from './user.enum'
import { UserService } from './user.service'

@Controller('user')
export default class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/get/:provider/:id')
	public async get(
		@Param('provider') provider: UserProvider,
		@Param('id') id: string
	) {
		return this.userService.get({ id, provider })
	}
}
