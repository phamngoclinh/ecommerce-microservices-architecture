import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1764165894895 implements MigrationInterface {
  name = 'Init1764165894895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "payment"."payment_methods" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "provider" text NOT NULL,
                "display_name" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "payment"."payment_transactions" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "type" text NOT NULL,
                "payload" json,
                "external_txn_id" character varying,
                "message" character varying,
                "payment_id" integer,
                CONSTRAINT "PK_d32b3c6b0d2c1d22604cbcc8c49" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "payment"."payments" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "orderId" integer NOT NULL,
                "status" text NOT NULL DEFAULT 'PENDING',
                "amount" numeric(15, 2) NOT NULL,
                "currency" character varying,
                "transaction_id" character varying,
                "method_id" integer,
                CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "payment"."refunds" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "amount" numeric(15, 2) NOT NULL,
                "reason" character varying,
                "external_refund_id" character varying,
                "payment_id" integer,
                CONSTRAINT "PK_5106efb01eeda7e49a78b869738" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"."payment_transactions"
            ADD CONSTRAINT "FK_1f4dd90aece142a3a591cf4334b" FOREIGN KEY ("payment_id") REFERENCES "payment"."payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"."payments"
            ADD CONSTRAINT "FK_9200663684b981a7bd078895a0c" FOREIGN KEY ("method_id") REFERENCES "payment"."payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"."refunds"
            ADD CONSTRAINT "FK_7f48aa5d56c42aeb495db016683" FOREIGN KEY ("payment_id") REFERENCES "payment"."payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "payment"."refunds" DROP CONSTRAINT "FK_7f48aa5d56c42aeb495db016683"
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"."payments" DROP CONSTRAINT "FK_9200663684b981a7bd078895a0c"
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"."payment_transactions" DROP CONSTRAINT "FK_1f4dd90aece142a3a591cf4334b"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"."refunds"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"."payments"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"."payment_transactions"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"."payment_methods"
        `);
  }
}
