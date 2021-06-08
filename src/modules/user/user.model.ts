import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'users' })
export class User {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String)
	@Column({ type: 'varchar', length: 255 })
	name: string

	@Field(() => String)
	@Column({ type: 'varchar', length: 255 })
	email: string

	@Field(() => Date)
	@Column({ name: 'email_verified', type: 'timestamptz' })
	emailVerified: Date

	@Field(() => String)
	@Column({ type: 'text' })
	image: string

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
