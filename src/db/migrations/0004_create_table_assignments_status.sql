CREATE TABLE "assignments_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"assignment_id" integer NOT NULL,
	"user_id" varchar(8) NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "assignments_status" ADD CONSTRAINT "assignments_status_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments_status" ADD CONSTRAINT "assignments_status_user_id_users_npm_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("npm") ON DELETE no action ON UPDATE no action;