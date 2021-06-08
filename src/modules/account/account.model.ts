import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'accounts' })
export class Account {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String)
	@Column({ name: 'compound_id', type: 'uuid' })
	compoundId: string

	@Field(() => String)
	@Column({ name: 'user_id', type: 'uuid' })
	userId: string

	@Field(() => String)
	@Column({ name: 'provider_type', type: 'varchar', length: 255 })
	providerType: string

	@Field(() => String)
	@Column({ name: 'provider_id', type: 'varchar', length: 255 })
	providerId: string

	@Field(() => String)
	@Column({ name: 'provider_account_id', type: 'varchar', length: 255 })
	providerAccountId: string

	@Field(() => String, { nullable: true })
	@Column({ name: 'refresh_token', type: 'text', nullable: true })
	refreshToken: string

	@Field(() => String, { nullable: true })
	@Column({ name: 'access_token', type: 'text', nullable: true })
	accessToken: string

	@Field(() => Date, { nullable: true })
	@Column({ name: 'access_token_expires', type: 'timestamptz', nullable: true })
	accessTokenExpires: Date

	@Field(() => Date)
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date

	@Field(() => Date)
	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date
}
