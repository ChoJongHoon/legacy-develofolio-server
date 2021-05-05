import { registerEnumType } from '@nestjs/graphql'

enum UserProvider {
	GITHUB = 'GITHUB',
}

registerEnumType(UserProvider, {
	name: 'UserProvider',
	description: 'UserProvider',
})

export { UserProvider }
