import { Field, ID, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { SocialLinks } from './social-link'

export type UserKey = {
	id: string
}

@ObjectType()
export class User {
	@Field(/* istanbul ignore next */ () => ID)
	id: string

	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	githubId?: string

	@Field(/* istanbul ignore next */ () => String, { nullable: true })
	profile?: string

	@Field(/* istanbul ignore next */ () => String)
	createAt: string

	@Field(/* istanbul ignore next */ () => GraphQLJSON, { nullable: true })
	content?: any

	@Field(/* istanbul ignore next */ () => SocialLinks)
	socialLinks: SocialLinks
}
