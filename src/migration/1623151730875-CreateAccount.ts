import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAccount1623151730875 implements MigrationInterface {
	name = 'CreateAccount1623151730875'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "compound_id" uuid NOT NULL, "user_id" uuid NOT NULL, "provider_type" character varying(255) NOT NULL, "provider_id" character varying(255) NOT NULL, "provider_account_id" character varying(255) NOT NULL, "refresh_token" text, "access_token" text, "access_token_expires" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "accounts"`)
	}
}
