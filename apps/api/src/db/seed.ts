import { getDb, initDb } from "./index";
import { admins, projects, settings, posts, bio_links } from "./schema";
import { hashPassword } from "../services/auth";
import { eq } from "drizzle-orm";
import { defaultSettings } from "./seedData/defaultSettings.data";
import { realShowcaseProjects } from "./seedData/projects";
import { initialBioLinks } from "./seedData/initialBioLinks.data";
import { samplePost } from "./seedData/samplePost.data";

export async function seedDatabase() {
  await initDb(undefined, true);
  const db = getDb();
  const now = new Date().toISOString();

  // 1. Seed Admin
  const [existingAdmin] = await db.select().from(admins).where(eq(admins.email, "ammar@andev.dz"));
  if (!existingAdmin) {
    const hash = await hashPassword("admin123456");
    await db.insert(admins).values({
      email: "ammar@andev.dz",
      password_hash: hash,
      created_at: now
    });
  }

  // 2. Seed Settings
  for (const [key, value] of Object.entries(defaultSettings)) {
    await db.insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value } });
  }

  // 3. Seed 5 Real Production Projects (with GitHub Repositories & Real Case Studies)
  for (const p of realShowcaseProjects) {
    const [existing] = await db.select().from(projects).where(eq(projects.slug, p.slug));
    if (existing) {
      await db.update(projects)
        .set({
          title_ar: p.title_ar,
          title_en: p.title_en,
          summary_ar: p.summary_ar,
          summary_en: p.summary_en,
          body_ar: p.body_ar,
          body_en: p.body_en,
          project_type: p.project_type,
          version: p.version,
          package_size: p.package_size,
          platforms_json: p.platforms_json,
          download_url: p.download_url,
          enable_live_preview: p.enable_live_preview,
          gallery_json: p.gallery_json,
          type_specs_json: p.type_specs_json,
          tech_json: p.tech_json,
          cover_image: p.cover_image,
          live_url: p.live_url,
          repo_url: p.repo_url,
          featured: p.featured,
          published: p.published,
          sort_order: p.sort_order,
          updated_at: now
        })
        .where(eq(projects.slug, p.slug));
    } else {
      await db.insert(projects).values({
        ...p,
        created_at: now,
        updated_at: now
      });
    }
  }

  // 4. Seed Sample Blog Post
  const [existingPost] = await db.select().from(posts).where(eq(posts.slug, samplePost.slug));
  if (!existingPost) {
    await db.insert(posts).values({
      ...samplePost,
      published: true,
      published_at: now,
      created_at: now,
      updated_at: now
    });
  }

  // 5. Seed Bio Links
  const existingLinks = await db.select().from(bio_links);
  if (existingLinks.length === 0) {
    for (const link of initialBioLinks) {
      await db.insert(bio_links).values({
        ...link,
        created_at: now,
        updated_at: now
      });
    }
  }
}

if (process.argv[1]?.endsWith("seed.ts")) {
  seedDatabase().then(() => {
    console.log("Database seeded successfully with Ammar Naass real production projects!");
    process.exit(0);
  }).catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
}
