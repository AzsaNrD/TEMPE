CREATE TYPE "public"."type" AS ENUM('individu', 'kelompok', 'vclass', 'kuis');--> statement-breakpoint
CREATE TABLE "assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"added_by" varchar(8) NOT NULL,
	"title" varchar(150) NOT NULL,
	"type" "type" NOT NULL,
	"description" text NOT NULL,
	"link" text NOT NULL,
	"deadline" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_added_by_users_npm_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("npm") ON DELETE no action ON UPDATE no action;