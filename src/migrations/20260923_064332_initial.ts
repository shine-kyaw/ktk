import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_category" AS ENUM('Cement Sacks', 'PP Woven Bags', 'Fillers', 'Thread', 'Machinery', 'Bearings');
  CREATE TYPE "public"."enum_products_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__products_v_version_category" AS ENUM('Cement Sacks', 'PP Woven Bags', 'Fillers', 'Thread', 'Machinery', 'Bearings');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_product_categories_name" AS ENUM('Cement Sacks', 'PP Woven Bags', 'Fillers', 'Thread', 'Machinery', 'Bearings');
  CREATE TYPE "public"."enum_leadership_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_group_companies_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_certificates_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__certificates_v_version_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_milestones_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_partners_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_services_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_activities_category" AS ENUM('CSR', 'Events', 'Exhibitions', 'Training', 'Commercial');
  CREATE TYPE "public"."enum_activities_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__activities_v_version_category" AS ENUM('CSR', 'Events', 'Exhibitions', 'Training', 'Commercial');
  CREATE TYPE "public"."enum__activities_v_version_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_news_category" AS ENUM('Company', 'Production', 'Partnership', 'CSR');
  CREATE TYPE "public"."enum_news_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('Company', 'Production', 'Partnership', 'CSR');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('published', 'draft');
  CREATE TABLE "products_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products_quality_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"detail" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "products_color_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"hex" varchar NOT NULL
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"alt" varchar NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "products_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"detail" varchar,
  	"preview" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"category" "enum_products_category" NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"long_description" varchar,
  	"eyebrow" varchar,
  	"brand" varchar,
  	"best_for" varchar,
  	"model" varchar,
  	"unique_value" varchar,
  	"printing" varchar,
  	"image_id" integer,
  	"image_src" varchar,
  	"brochure_url" varchar,
  	"status" "enum_products_status" DEFAULT 'published' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_products_v_version_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_quality_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_variants_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_color_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"hex" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"detail" varchar,
  	"preview" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar NOT NULL,
  	"version_category" "enum__products_v_version_category" NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_summary" varchar NOT NULL,
  	"version_long_description" varchar,
  	"version_eyebrow" varchar,
  	"version_brand" varchar,
  	"version_best_for" varchar,
  	"version_model" varchar,
  	"version_unique_value" varchar,
  	"version_printing" varchar,
  	"version_image_id" integer,
  	"version_image_src" varchar,
  	"version_brochure_url" varchar,
  	"version_status" "enum__products_v_version_status" DEFAULT 'published' NOT NULL,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" "enum_product_categories_name" NOT NULL,
  	"slug" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"banner_id" integer,
  	"banner_src" varchar,
  	"banner_caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leadership" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"title" varchar DEFAULT 'Director' NOT NULL,
  	"portrait_id" integer,
  	"portrait_src" varchar,
  	"status" "enum_leadership_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "group_companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"focus" varchar NOT NULL,
  	"website" varchar,
  	"status" "enum_group_companies_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"issuer" varchar,
  	"reference_number" varchar,
  	"scope" varchar,
  	"issued_on" timestamp(3) with time zone,
  	"expires_on" timestamp(3) with time zone,
  	"image_id" integer,
  	"image_src" varchar,
  	"document_id" integer,
  	"document_src" varchar,
  	"anchor" varchar,
  	"status" "enum_certificates_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_certificates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar NOT NULL,
  	"version_issuer" varchar,
  	"version_reference_number" varchar,
  	"version_scope" varchar,
  	"version_issued_on" timestamp(3) with time zone,
  	"version_expires_on" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_image_src" varchar,
  	"version_document_id" integer,
  	"version_document_src" varchar,
  	"version_anchor" varchar,
  	"version_status" "enum__certificates_v_version_status" DEFAULT 'published' NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "milestones" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"status" "enum_milestones_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"origin" varchar NOT NULL,
  	"note" varchar NOT NULL,
  	"status" "enum_partners_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"status" "enum_services_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_services_v_version_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_summary" varchar NOT NULL,
  	"version_status" "enum__services_v_version_status" DEFAULT 'published' NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activities_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"alt" varchar NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"category" "enum_activities_category" NOT NULL,
  	"slug" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"video_id" integer,
  	"video_src" varchar,
  	"video_poster_id" integer,
  	"video_poster_src" varchar,
  	"external_video_url" varchar,
  	"source_url" varchar,
  	"status" "enum_activities_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_activities_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar NOT NULL,
  	"version_category" "enum__activities_v_version_category" NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_date" varchar NOT NULL,
  	"version_detail" varchar NOT NULL,
  	"version_image_id" integer,
  	"version_image_src" varchar,
  	"version_video_id" integer,
  	"version_video_src" varchar,
  	"version_video_poster_id" integer,
  	"version_video_poster_src" varchar,
  	"version_external_video_url" varchar,
  	"version_source_url" varchar,
  	"version_status" "enum__activities_v_version_status" DEFAULT 'published' NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"category" "enum_news_category" NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"content" jsonb NOT NULL,
  	"status" "enum_news_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_date" timestamp(3) with time zone NOT NULL,
  	"version_category" "enum__news_v_version_category" NOT NULL,
  	"version_excerpt" varchar NOT NULL,
  	"version_image_id" integer,
  	"version_image_src" varchar,
  	"version_content" jsonb NOT NULL,
  	"version_status" "enum__news_v_version_status" DEFAULT 'published' NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"product_categories_id" integer,
  	"leadership_id" integer,
  	"group_companies_id" integer,
  	"certificates_id" integer,
  	"milestones_id" integer,
  	"partners_id" integer,
  	"services_id" integer,
  	"activities_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "company_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"phone" varchar NOT NULL
  );
  
  CREATE TABLE "company_executive_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_business_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_industrial_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_packaging_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_team_portraits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar
  );
  
  CREATE TABLE "company" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"viber" varchar,
  	"facebook" varchar,
  	"response_times_email" varchar,
  	"response_times_phone" varchar,
  	"hq_line1" varchar,
  	"hq_line2" varchar,
  	"maps_url" varchar,
  	"office_hours" varchar,
  	"legal_name" varchar,
  	"group" varchar,
  	"short" varchar,
  	"tagline" varchar,
  	"one_liner" varchar,
  	"founded_trading" numeric,
  	"founded_manufacturing" numeric,
  	"factory" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_company_v_version_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_executive_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_business_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_industrial_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_packaging_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v_version_team_portraits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_src" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_company_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_viber" varchar,
  	"version_facebook" varchar,
  	"version_response_times_email" varchar,
  	"version_response_times_phone" varchar,
  	"version_hq_line1" varchar,
  	"version_hq_line2" varchar,
  	"version_maps_url" varchar,
  	"version_office_hours" varchar,
  	"version_legal_name" varchar,
  	"version_group" varchar,
  	"version_short" varchar,
  	"version_tagline" varchar,
  	"version_one_liner" varchar,
  	"version_founded_trading" numeric,
  	"version_founded_manufacturing" numeric,
  	"version_factory" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "page_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"is_year" boolean
  );
  
  CREATE TABLE "page_content_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "page_content_why_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "page_content_core_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "page_content_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "page_content_quality_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "page_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"no" varchar NOT NULL,
  	"stage" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_page_content_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"is_year" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_why_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_core_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_quality_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v_version_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"no" varchar NOT NULL,
  	"stage" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_news" boolean DEFAULT false,
  	"show_activities" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "products_applications" ADD CONSTRAINT "products_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_quality_attributes" ADD CONSTRAINT "products_quality_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specs" ADD CONSTRAINT "products_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_benefits" ADD CONSTRAINT "products_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_attributes" ADD CONSTRAINT "products_variants_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_color_options" ADD CONSTRAINT "products_color_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_resources" ADD CONSTRAINT "products_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_applications" ADD CONSTRAINT "_products_v_version_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_quality_attributes" ADD CONSTRAINT "_products_v_version_quality_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specs" ADD CONSTRAINT "_products_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_benefits" ADD CONSTRAINT "_products_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_variants_attributes" ADD CONSTRAINT "_products_v_version_variants_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_variants" ADD CONSTRAINT "_products_v_version_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_color_options" ADD CONSTRAINT "_products_v_version_color_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_resources" ADD CONSTRAINT "_products_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leadership" ADD CONSTRAINT "leadership_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_parent_id_certificates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certificates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_document_id_media_id_fk" FOREIGN KEY ("version_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_points" ADD CONSTRAINT "services_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_points" ADD CONSTRAINT "_services_v_version_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_gallery" ADD CONSTRAINT "activities_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_gallery" ADD CONSTRAINT "activities_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v_version_gallery" ADD CONSTRAINT "_activities_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v_version_gallery" ADD CONSTRAINT "_activities_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_parent_id_activities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_video_poster_id_media_id_fk" FOREIGN KEY ("version_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_fk" FOREIGN KEY ("leadership_id") REFERENCES "public"."leadership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_group_companies_fk" FOREIGN KEY ("group_companies_id") REFERENCES "public"."group_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_milestones_fk" FOREIGN KEY ("milestones_id") REFERENCES "public"."milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_phones" ADD CONSTRAINT "company_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_emails" ADD CONSTRAINT "company_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_contacts" ADD CONSTRAINT "company_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_executive_summary" ADD CONSTRAINT "company_executive_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_business_activities" ADD CONSTRAINT "company_business_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_industrial_products" ADD CONSTRAINT "company_industrial_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_packaging_products" ADD CONSTRAINT "company_packaging_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_reasons" ADD CONSTRAINT "company_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_team_portraits" ADD CONSTRAINT "company_team_portraits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_team_portraits" ADD CONSTRAINT "company_team_portraits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_phones" ADD CONSTRAINT "_company_v_version_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_emails" ADD CONSTRAINT "_company_v_version_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_contacts" ADD CONSTRAINT "_company_v_version_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_executive_summary" ADD CONSTRAINT "_company_v_version_executive_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_business_activities" ADD CONSTRAINT "_company_v_version_business_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_industrial_products" ADD CONSTRAINT "_company_v_version_industrial_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_packaging_products" ADD CONSTRAINT "_company_v_version_packaging_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_reasons" ADD CONSTRAINT "_company_v_version_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_v_version_team_portraits" ADD CONSTRAINT "_company_v_version_team_portraits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_v_version_team_portraits" ADD CONSTRAINT "_company_v_version_team_portraits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_stats" ADD CONSTRAINT "page_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_proof" ADD CONSTRAINT "page_content_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_why_points" ADD CONSTRAINT "page_content_why_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_core_values" ADD CONSTRAINT "page_content_core_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_industries" ADD CONSTRAINT "page_content_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_quality_pillars" ADD CONSTRAINT "page_content_quality_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_content_process_steps" ADD CONSTRAINT "page_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_stats" ADD CONSTRAINT "_page_content_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_proof" ADD CONSTRAINT "_page_content_v_version_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_why_points" ADD CONSTRAINT "_page_content_v_version_why_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_core_values" ADD CONSTRAINT "_page_content_v_version_core_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_industries" ADD CONSTRAINT "_page_content_v_version_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_quality_pillars" ADD CONSTRAINT "_page_content_v_version_quality_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_content_v_version_process_steps" ADD CONSTRAINT "_page_content_v_version_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_content_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_applications_order_idx" ON "products_applications" USING btree ("_order");
  CREATE INDEX "products_applications_parent_id_idx" ON "products_applications" USING btree ("_parent_id");
  CREATE INDEX "products_quality_attributes_order_idx" ON "products_quality_attributes" USING btree ("_order");
  CREATE INDEX "products_quality_attributes_parent_id_idx" ON "products_quality_attributes" USING btree ("_parent_id");
  CREATE INDEX "products_specs_order_idx" ON "products_specs" USING btree ("_order");
  CREATE INDEX "products_specs_parent_id_idx" ON "products_specs" USING btree ("_parent_id");
  CREATE INDEX "products_benefits_order_idx" ON "products_benefits" USING btree ("_order");
  CREATE INDEX "products_benefits_parent_id_idx" ON "products_benefits" USING btree ("_parent_id");
  CREATE INDEX "products_variants_attributes_order_idx" ON "products_variants_attributes" USING btree ("_order");
  CREATE INDEX "products_variants_attributes_parent_id_idx" ON "products_variants_attributes" USING btree ("_parent_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE INDEX "products_color_options_order_idx" ON "products_color_options" USING btree ("_order");
  CREATE INDEX "products_color_options_parent_id_idx" ON "products_color_options" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX "products_resources_order_idx" ON "products_resources" USING btree ("_order");
  CREATE INDEX "products_resources_parent_id_idx" ON "products_resources" USING btree ("_parent_id");
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_status_idx" ON "products" USING btree ("status");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "_products_v_version_applications_order_idx" ON "_products_v_version_applications" USING btree ("_order");
  CREATE INDEX "_products_v_version_applications_parent_id_idx" ON "_products_v_version_applications" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_quality_attributes_order_idx" ON "_products_v_version_quality_attributes" USING btree ("_order");
  CREATE INDEX "_products_v_version_quality_attributes_parent_id_idx" ON "_products_v_version_quality_attributes" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_specs_order_idx" ON "_products_v_version_specs" USING btree ("_order");
  CREATE INDEX "_products_v_version_specs_parent_id_idx" ON "_products_v_version_specs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_benefits_order_idx" ON "_products_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_products_v_version_benefits_parent_id_idx" ON "_products_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_variants_attributes_order_idx" ON "_products_v_version_variants_attributes" USING btree ("_order");
  CREATE INDEX "_products_v_version_variants_attributes_parent_id_idx" ON "_products_v_version_variants_attributes" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_variants_order_idx" ON "_products_v_version_variants" USING btree ("_order");
  CREATE INDEX "_products_v_version_variants_parent_id_idx" ON "_products_v_version_variants" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_color_options_order_idx" ON "_products_v_version_color_options" USING btree ("_order");
  CREATE INDEX "_products_v_version_color_options_parent_id_idx" ON "_products_v_version_color_options" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_resources_order_idx" ON "_products_v_version_resources" USING btree ("_order");
  CREATE INDEX "_products_v_version_resources_parent_id_idx" ON "_products_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version__order_idx" ON "_products_v" USING btree ("version__order");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "_products_v_version_version_status_idx" ON "_products_v" USING btree ("version_status");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "product_categories__order_idx" ON "product_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "product_categories_name_idx" ON "product_categories" USING btree ("name");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_banner_idx" ON "product_categories" USING btree ("banner_id");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "leadership__order_idx" ON "leadership" USING btree ("_order");
  CREATE INDEX "leadership_portrait_idx" ON "leadership" USING btree ("portrait_id");
  CREATE INDEX "leadership_status_idx" ON "leadership" USING btree ("status");
  CREATE INDEX "leadership_updated_at_idx" ON "leadership" USING btree ("updated_at");
  CREATE INDEX "leadership_created_at_idx" ON "leadership" USING btree ("created_at");
  CREATE INDEX "group_companies__order_idx" ON "group_companies" USING btree ("_order");
  CREATE INDEX "group_companies_status_idx" ON "group_companies" USING btree ("status");
  CREATE INDEX "group_companies_updated_at_idx" ON "group_companies" USING btree ("updated_at");
  CREATE INDEX "group_companies_created_at_idx" ON "group_companies" USING btree ("created_at");
  CREATE INDEX "certificates__order_idx" ON "certificates" USING btree ("_order");
  CREATE INDEX "certificates_image_idx" ON "certificates" USING btree ("image_id");
  CREATE INDEX "certificates_document_idx" ON "certificates" USING btree ("document_id");
  CREATE INDEX "certificates_anchor_idx" ON "certificates" USING btree ("anchor");
  CREATE INDEX "certificates_status_idx" ON "certificates" USING btree ("status");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "_certificates_v_parent_idx" ON "_certificates_v" USING btree ("parent_id");
  CREATE INDEX "_certificates_v_version_version__order_idx" ON "_certificates_v" USING btree ("version__order");
  CREATE INDEX "_certificates_v_version_version_image_idx" ON "_certificates_v" USING btree ("version_image_id");
  CREATE INDEX "_certificates_v_version_version_document_idx" ON "_certificates_v" USING btree ("version_document_id");
  CREATE INDEX "_certificates_v_version_version_anchor_idx" ON "_certificates_v" USING btree ("version_anchor");
  CREATE INDEX "_certificates_v_version_version_status_idx" ON "_certificates_v" USING btree ("version_status");
  CREATE INDEX "_certificates_v_version_version_updated_at_idx" ON "_certificates_v" USING btree ("version_updated_at");
  CREATE INDEX "_certificates_v_version_version_created_at_idx" ON "_certificates_v" USING btree ("version_created_at");
  CREATE INDEX "_certificates_v_created_at_idx" ON "_certificates_v" USING btree ("created_at");
  CREATE INDEX "_certificates_v_updated_at_idx" ON "_certificates_v" USING btree ("updated_at");
  CREATE INDEX "milestones__order_idx" ON "milestones" USING btree ("_order");
  CREATE INDEX "milestones_status_idx" ON "milestones" USING btree ("status");
  CREATE INDEX "milestones_updated_at_idx" ON "milestones" USING btree ("updated_at");
  CREATE INDEX "milestones_created_at_idx" ON "milestones" USING btree ("created_at");
  CREATE INDEX "partners__order_idx" ON "partners" USING btree ("_order");
  CREATE INDEX "partners_status_idx" ON "partners" USING btree ("status");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "services_points_order_idx" ON "services_points" USING btree ("_order");
  CREATE INDEX "services_points_parent_id_idx" ON "services_points" USING btree ("_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_status_idx" ON "services" USING btree ("status");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "_services_v_version_points_order_idx" ON "_services_v_version_points" USING btree ("_order");
  CREATE INDEX "_services_v_version_points_parent_id_idx" ON "_services_v_version_points" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version__order_idx" ON "_services_v" USING btree ("version__order");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_status_idx" ON "_services_v" USING btree ("version_status");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "activities_gallery_order_idx" ON "activities_gallery" USING btree ("_order");
  CREATE INDEX "activities_gallery_parent_id_idx" ON "activities_gallery" USING btree ("_parent_id");
  CREATE INDEX "activities_gallery_image_idx" ON "activities_gallery" USING btree ("image_id");
  CREATE INDEX "activities__order_idx" ON "activities" USING btree ("_order");
  CREATE UNIQUE INDEX "activities_slug_idx" ON "activities" USING btree ("slug");
  CREATE INDEX "activities_image_idx" ON "activities" USING btree ("image_id");
  CREATE INDEX "activities_video_idx" ON "activities" USING btree ("video_id");
  CREATE INDEX "activities_video_poster_idx" ON "activities" USING btree ("video_poster_id");
  CREATE INDEX "activities_status_idx" ON "activities" USING btree ("status");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "_activities_v_version_gallery_order_idx" ON "_activities_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_activities_v_version_gallery_parent_id_idx" ON "_activities_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_gallery_image_idx" ON "_activities_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_activities_v_parent_idx" ON "_activities_v" USING btree ("parent_id");
  CREATE INDEX "_activities_v_version_version__order_idx" ON "_activities_v" USING btree ("version__order");
  CREATE INDEX "_activities_v_version_version_slug_idx" ON "_activities_v" USING btree ("version_slug");
  CREATE INDEX "_activities_v_version_version_image_idx" ON "_activities_v" USING btree ("version_image_id");
  CREATE INDEX "_activities_v_version_version_video_idx" ON "_activities_v" USING btree ("version_video_id");
  CREATE INDEX "_activities_v_version_version_video_poster_idx" ON "_activities_v" USING btree ("version_video_poster_id");
  CREATE INDEX "_activities_v_version_version_status_idx" ON "_activities_v" USING btree ("version_status");
  CREATE INDEX "_activities_v_version_version_updated_at_idx" ON "_activities_v" USING btree ("version_updated_at");
  CREATE INDEX "_activities_v_version_version_created_at_idx" ON "_activities_v" USING btree ("version_created_at");
  CREATE INDEX "_activities_v_created_at_idx" ON "_activities_v" USING btree ("created_at");
  CREATE INDEX "_activities_v_updated_at_idx" ON "_activities_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_status_idx" ON "news" USING btree ("status");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_image_idx" ON "_news_v" USING btree ("version_image_id");
  CREATE INDEX "_news_v_version_version_status_idx" ON "_news_v" USING btree ("version_status");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_leadership_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_id");
  CREATE INDEX "payload_locked_documents_rels_group_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("group_companies_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "payload_locked_documents_rels_milestones_id_idx" ON "payload_locked_documents_rels" USING btree ("milestones_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "company_phones_order_idx" ON "company_phones" USING btree ("_order");
  CREATE INDEX "company_phones_parent_id_idx" ON "company_phones" USING btree ("_parent_id");
  CREATE INDEX "company_emails_order_idx" ON "company_emails" USING btree ("_order");
  CREATE INDEX "company_emails_parent_id_idx" ON "company_emails" USING btree ("_parent_id");
  CREATE INDEX "company_contacts_order_idx" ON "company_contacts" USING btree ("_order");
  CREATE INDEX "company_contacts_parent_id_idx" ON "company_contacts" USING btree ("_parent_id");
  CREATE INDEX "company_executive_summary_order_idx" ON "company_executive_summary" USING btree ("_order");
  CREATE INDEX "company_executive_summary_parent_id_idx" ON "company_executive_summary" USING btree ("_parent_id");
  CREATE INDEX "company_business_activities_order_idx" ON "company_business_activities" USING btree ("_order");
  CREATE INDEX "company_business_activities_parent_id_idx" ON "company_business_activities" USING btree ("_parent_id");
  CREATE INDEX "company_industrial_products_order_idx" ON "company_industrial_products" USING btree ("_order");
  CREATE INDEX "company_industrial_products_parent_id_idx" ON "company_industrial_products" USING btree ("_parent_id");
  CREATE INDEX "company_packaging_products_order_idx" ON "company_packaging_products" USING btree ("_order");
  CREATE INDEX "company_packaging_products_parent_id_idx" ON "company_packaging_products" USING btree ("_parent_id");
  CREATE INDEX "company_reasons_order_idx" ON "company_reasons" USING btree ("_order");
  CREATE INDEX "company_reasons_parent_id_idx" ON "company_reasons" USING btree ("_parent_id");
  CREATE INDEX "company_team_portraits_order_idx" ON "company_team_portraits" USING btree ("_order");
  CREATE INDEX "company_team_portraits_parent_id_idx" ON "company_team_portraits" USING btree ("_parent_id");
  CREATE INDEX "company_team_portraits_image_idx" ON "company_team_portraits" USING btree ("image_id");
  CREATE INDEX "_company_v_version_phones_order_idx" ON "_company_v_version_phones" USING btree ("_order");
  CREATE INDEX "_company_v_version_phones_parent_id_idx" ON "_company_v_version_phones" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_emails_order_idx" ON "_company_v_version_emails" USING btree ("_order");
  CREATE INDEX "_company_v_version_emails_parent_id_idx" ON "_company_v_version_emails" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_contacts_order_idx" ON "_company_v_version_contacts" USING btree ("_order");
  CREATE INDEX "_company_v_version_contacts_parent_id_idx" ON "_company_v_version_contacts" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_executive_summary_order_idx" ON "_company_v_version_executive_summary" USING btree ("_order");
  CREATE INDEX "_company_v_version_executive_summary_parent_id_idx" ON "_company_v_version_executive_summary" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_business_activities_order_idx" ON "_company_v_version_business_activities" USING btree ("_order");
  CREATE INDEX "_company_v_version_business_activities_parent_id_idx" ON "_company_v_version_business_activities" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_industrial_products_order_idx" ON "_company_v_version_industrial_products" USING btree ("_order");
  CREATE INDEX "_company_v_version_industrial_products_parent_id_idx" ON "_company_v_version_industrial_products" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_packaging_products_order_idx" ON "_company_v_version_packaging_products" USING btree ("_order");
  CREATE INDEX "_company_v_version_packaging_products_parent_id_idx" ON "_company_v_version_packaging_products" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_reasons_order_idx" ON "_company_v_version_reasons" USING btree ("_order");
  CREATE INDEX "_company_v_version_reasons_parent_id_idx" ON "_company_v_version_reasons" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_team_portraits_order_idx" ON "_company_v_version_team_portraits" USING btree ("_order");
  CREATE INDEX "_company_v_version_team_portraits_parent_id_idx" ON "_company_v_version_team_portraits" USING btree ("_parent_id");
  CREATE INDEX "_company_v_version_team_portraits_image_idx" ON "_company_v_version_team_portraits" USING btree ("image_id");
  CREATE INDEX "_company_v_created_at_idx" ON "_company_v" USING btree ("created_at");
  CREATE INDEX "_company_v_updated_at_idx" ON "_company_v" USING btree ("updated_at");
  CREATE INDEX "page_content_stats_order_idx" ON "page_content_stats" USING btree ("_order");
  CREATE INDEX "page_content_stats_parent_id_idx" ON "page_content_stats" USING btree ("_parent_id");
  CREATE INDEX "page_content_proof_order_idx" ON "page_content_proof" USING btree ("_order");
  CREATE INDEX "page_content_proof_parent_id_idx" ON "page_content_proof" USING btree ("_parent_id");
  CREATE INDEX "page_content_why_points_order_idx" ON "page_content_why_points" USING btree ("_order");
  CREATE INDEX "page_content_why_points_parent_id_idx" ON "page_content_why_points" USING btree ("_parent_id");
  CREATE INDEX "page_content_core_values_order_idx" ON "page_content_core_values" USING btree ("_order");
  CREATE INDEX "page_content_core_values_parent_id_idx" ON "page_content_core_values" USING btree ("_parent_id");
  CREATE INDEX "page_content_industries_order_idx" ON "page_content_industries" USING btree ("_order");
  CREATE INDEX "page_content_industries_parent_id_idx" ON "page_content_industries" USING btree ("_parent_id");
  CREATE INDEX "page_content_quality_pillars_order_idx" ON "page_content_quality_pillars" USING btree ("_order");
  CREATE INDEX "page_content_quality_pillars_parent_id_idx" ON "page_content_quality_pillars" USING btree ("_parent_id");
  CREATE INDEX "page_content_process_steps_order_idx" ON "page_content_process_steps" USING btree ("_order");
  CREATE INDEX "page_content_process_steps_parent_id_idx" ON "page_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_stats_order_idx" ON "_page_content_v_version_stats" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_stats_parent_id_idx" ON "_page_content_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_proof_order_idx" ON "_page_content_v_version_proof" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_proof_parent_id_idx" ON "_page_content_v_version_proof" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_why_points_order_idx" ON "_page_content_v_version_why_points" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_why_points_parent_id_idx" ON "_page_content_v_version_why_points" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_core_values_order_idx" ON "_page_content_v_version_core_values" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_core_values_parent_id_idx" ON "_page_content_v_version_core_values" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_industries_order_idx" ON "_page_content_v_version_industries" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_industries_parent_id_idx" ON "_page_content_v_version_industries" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_quality_pillars_order_idx" ON "_page_content_v_version_quality_pillars" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_quality_pillars_parent_id_idx" ON "_page_content_v_version_quality_pillars" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_version_process_steps_order_idx" ON "_page_content_v_version_process_steps" USING btree ("_order");
  CREATE INDEX "_page_content_v_version_process_steps_parent_id_idx" ON "_page_content_v_version_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_page_content_v_created_at_idx" ON "_page_content_v" USING btree ("created_at");
  CREATE INDEX "_page_content_v_updated_at_idx" ON "_page_content_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_applications" CASCADE;
  DROP TABLE "products_quality_attributes" CASCADE;
  DROP TABLE "products_specs" CASCADE;
  DROP TABLE "products_benefits" CASCADE;
  DROP TABLE "products_variants_attributes" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products_color_options" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_resources" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "_products_v_version_applications" CASCADE;
  DROP TABLE "_products_v_version_quality_attributes" CASCADE;
  DROP TABLE "_products_v_version_specs" CASCADE;
  DROP TABLE "_products_v_version_benefits" CASCADE;
  DROP TABLE "_products_v_version_variants_attributes" CASCADE;
  DROP TABLE "_products_v_version_variants" CASCADE;
  DROP TABLE "_products_v_version_color_options" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v_version_resources" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "leadership" CASCADE;
  DROP TABLE "group_companies" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "_certificates_v" CASCADE;
  DROP TABLE "milestones" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "services_points" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v_version_points" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "activities_gallery" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "_activities_v_version_gallery" CASCADE;
  DROP TABLE "_activities_v" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "company_phones" CASCADE;
  DROP TABLE "company_emails" CASCADE;
  DROP TABLE "company_contacts" CASCADE;
  DROP TABLE "company_executive_summary" CASCADE;
  DROP TABLE "company_business_activities" CASCADE;
  DROP TABLE "company_industrial_products" CASCADE;
  DROP TABLE "company_packaging_products" CASCADE;
  DROP TABLE "company_reasons" CASCADE;
  DROP TABLE "company_team_portraits" CASCADE;
  DROP TABLE "company" CASCADE;
  DROP TABLE "_company_v_version_phones" CASCADE;
  DROP TABLE "_company_v_version_emails" CASCADE;
  DROP TABLE "_company_v_version_contacts" CASCADE;
  DROP TABLE "_company_v_version_executive_summary" CASCADE;
  DROP TABLE "_company_v_version_business_activities" CASCADE;
  DROP TABLE "_company_v_version_industrial_products" CASCADE;
  DROP TABLE "_company_v_version_packaging_products" CASCADE;
  DROP TABLE "_company_v_version_reasons" CASCADE;
  DROP TABLE "_company_v_version_team_portraits" CASCADE;
  DROP TABLE "_company_v" CASCADE;
  DROP TABLE "page_content_stats" CASCADE;
  DROP TABLE "page_content_proof" CASCADE;
  DROP TABLE "page_content_why_points" CASCADE;
  DROP TABLE "page_content_core_values" CASCADE;
  DROP TABLE "page_content_industries" CASCADE;
  DROP TABLE "page_content_quality_pillars" CASCADE;
  DROP TABLE "page_content_process_steps" CASCADE;
  DROP TABLE "page_content" CASCADE;
  DROP TABLE "_page_content_v_version_stats" CASCADE;
  DROP TABLE "_page_content_v_version_proof" CASCADE;
  DROP TABLE "_page_content_v_version_why_points" CASCADE;
  DROP TABLE "_page_content_v_version_core_values" CASCADE;
  DROP TABLE "_page_content_v_version_industries" CASCADE;
  DROP TABLE "_page_content_v_version_quality_pillars" CASCADE;
  DROP TABLE "_page_content_v_version_process_steps" CASCADE;
  DROP TABLE "_page_content_v" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_category";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_product_categories_name";
  DROP TYPE "public"."enum_leadership_status";
  DROP TYPE "public"."enum_group_companies_status";
  DROP TYPE "public"."enum_certificates_status";
  DROP TYPE "public"."enum__certificates_v_version_status";
  DROP TYPE "public"."enum_milestones_status";
  DROP TYPE "public"."enum_partners_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_activities_category";
  DROP TYPE "public"."enum_activities_status";
  DROP TYPE "public"."enum__activities_v_version_category";
  DROP TYPE "public"."enum__activities_v_version_status";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";`)
}
