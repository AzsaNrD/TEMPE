CREATE TYPE "public"."gender" AS ENUM('laki-laki', 'perempuan');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'mahasiswa', 'dosen');--> statement-breakpoint
CREATE TABLE "users" (
	"npm" varchar(8) PRIMARY KEY NOT NULL,
	"nama" varchar(100) NOT NULL,
	"email" varchar(254),
	"role" "role" DEFAULT 'mahasiswa' NOT NULL,
	"gender" "gender" NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
