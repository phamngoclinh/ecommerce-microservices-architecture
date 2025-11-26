import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1764165678293 implements MigrationInterface {
  name = 'Init1764165678293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "catalog"."products" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "name" character varying(255) NOT NULL,
                "price" numeric(15, 2) NOT NULL,
                "status" text NOT NULL DEFAULT 'ACTIVE',
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "catalog"."products"
        `);
    await queryRunner.query(`DROP SCHEMA catalog`);
  }
}
