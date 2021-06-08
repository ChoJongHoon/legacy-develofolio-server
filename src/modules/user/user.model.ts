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

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', length: 255, nullable: true })
	email: string

	@Field(() => Date, { nullable: true })
	@Column({ name: 'email_verified', type: 'timestamptz', nullable: true })
	emailVerified: Date

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
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
