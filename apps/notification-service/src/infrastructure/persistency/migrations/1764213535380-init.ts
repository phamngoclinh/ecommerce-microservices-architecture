import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764213535380 implements MigrationInterface {
    name = 'Init1764213535380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment"."notification_messages" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "recipient" character varying(255) NOT NULL,
                "subject" character varying(255) NOT NULL,
                "message" text NOT NULL,
                "status" text NOT NULL DEFAULT 'pending',
                "messageType" text NOT NULL DEFAULT 'email',
                "externalMessageId" character varying(255),
                "errorMessage" text,
                "sentAt" TIMESTAMP,
                "correlationId" character varying(255),
                CONSTRAINT "PK_025a03ac35a495f0a6d8730350d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_de4dbe1da046e4ce19d7c44b60" ON "payment"."notification_messages" ("messageType")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_862affc8a5edf24d3f6f9ef932" ON "payment"."notification_messages" ("created_at")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_24c5ce76bebc0a2d1758ebfbc6" ON "payment"."notification_messages" ("recipient")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_36627e3afccca2d6fbfe0c8b10" ON "payment"."notification_messages" ("status")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "payment"."IDX_36627e3afccca2d6fbfe0c8b10"
        `);
        await queryRunner.query(`
            DROP INDEX "payment"."IDX_24c5ce76bebc0a2d1758ebfbc6"
        `);
        await queryRunner.query(`
            DROP INDEX "payment"."IDX_862affc8a5edf24d3f6f9ef932"
        `);
        await queryRunner.query(`
            DROP INDEX "payment"."IDX_de4dbe1da046e4ce19d7c44b60"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"."notification_messages"
        `);
    }

}
