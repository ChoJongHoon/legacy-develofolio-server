import { registerEnumType } from '@nestjs/graphql'

enum UserProvider {
	github = 'github',
}

registerEnumType(UserProvider, {
	name: 'UserProvider',
	description: 'UserProvider',
})

export { UserProvider }
