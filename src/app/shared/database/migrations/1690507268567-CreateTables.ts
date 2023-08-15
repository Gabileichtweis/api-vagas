import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1690507268567 implements MigrationInterface {
    name = 'CreateTables1690507268567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL, "enterprise_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."job_applications" ("id_candidate" uuid NOT NULL, "id_job" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "success" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_29270b675df5614c7f90bc17454" PRIMARY KEY ("id_candidate", "id_job"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."jobs" ("id" uuid NOT NULL, "description" character varying NOT NULL, "enterprise" character varying NOT NULL, "limit_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL, "id_recruiter" uuid NOT NULL, "max_candidates" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."job_applications" ADD CONSTRAINT "FK_fd16ec004481e662472752551fa" FOREIGN KEY ("id_candidate") REFERENCES "vagas"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."job_applications" ADD CONSTRAINT "FK_426d3e64289c4b8b9422eab1d25" FOREIGN KEY ("id_job") REFERENCES "vagas"."jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."jobs" ADD CONSTRAINT "FK_6dd5c65ff0ae0adfd676e58ecef" FOREIGN KEY ("id_recruiter") REFERENCES "vagas"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."jobs" DROP CONSTRAINT "FK_6dd5c65ff0ae0adfd676e58ecef"`);
        await queryRunner.query(`ALTER TABLE "vagas"."job_applications" DROP CONSTRAINT "FK_426d3e64289c4b8b9422eab1d25"`);
        await queryRunner.query(`ALTER TABLE "vagas"."job_applications" DROP CONSTRAINT "FK_fd16ec004481e662472752551fa"`);
        await queryRunner.query(`DROP TABLE "vagas"."jobs"`);
        await queryRunner.query(`DROP TABLE "vagas"."job_applications"`);
        await queryRunner.query(`DROP TABLE "vagas"."users"`);
    }

}
