import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1730000000000 implements MigrationInterface {
  name = 'CreateInitialTables1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "password_hash" varchar(255) NOT NULL,
        "created_at" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_users_email" ON "users" ("email")`,
    );

    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" varchar PRIMARY KEY NOT NULL,
        "user_id" varchar NOT NULL,
        "name" varchar(255) NOT NULL,
        "level" varchar(20) NOT NULL,
        "xp" integer NOT NULL,
        "frequency" varchar(20) NOT NULL DEFAULT 'diario',
        "created_at" datetime NOT NULL DEFAULT (datetime('now')),
        CONSTRAINT "FK_tasks_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_user_id" ON "tasks" ("user_id")`,
    );

    await queryRunner.query(`
      CREATE TABLE "completions" (
        "id" varchar PRIMARY KEY NOT NULL,
        "user_id" varchar NOT NULL,
        "task_id" varchar NOT NULL,
        "date" date NOT NULL,
        CONSTRAINT "UQ_completions_user_task_date" UNIQUE ("user_id", "task_id", "date"),
        CONSTRAINT "FK_completions_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_completions_task" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_completions_user_id" ON "completions" ("user_id")`,
    );

    await queryRunner.query(`
      CREATE TABLE "daily_goals" (
        "id" varchar PRIMARY KEY NOT NULL,
        "user_id" varchar NOT NULL,
        "date" date NOT NULL,
        "task_id" varchar NOT NULL,
        CONSTRAINT "UQ_daily_goals_user_date_task" UNIQUE ("user_id", "date", "task_id"),
        CONSTRAINT "FK_daily_goals_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_daily_goals_task" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_daily_goals_user_id" ON "daily_goals" ("user_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "daily_goals"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "completions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tasks"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
