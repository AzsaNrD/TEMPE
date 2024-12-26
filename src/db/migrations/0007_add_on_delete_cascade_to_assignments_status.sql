ALTER TABLE "assignments_status" DROP CONSTRAINT "assignments_status_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "assignments_status" ADD CONSTRAINT "assignments_status_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;