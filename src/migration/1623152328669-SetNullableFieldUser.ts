import { MigrationInterface, QueryRunner } from 'typeorm'

export class SetNullableFieldUser1623152328669 implements MigrationInterface {
	name = 'SetNullableFieldUser1623152328669'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email_verified" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email_verified" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`
		)
	}
}
