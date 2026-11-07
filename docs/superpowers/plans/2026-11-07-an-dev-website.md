# AN DEV Website & Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete v1.0 bilingual web platform and administration dashboard for AN DEV software agency (Algeria) using a modern Vite + React frontend, Fastify + SQLite (better-sqlite3 + Drizzle ORM) backend, and a tailored technical design system.

**Architecture:** Monorepo architecture containing `apps/web` (Vite + React + Tailwind CSS + TanStack Query), `apps/api` (Fastify + Drizzle ORM + SQLite + Argon2 + Sharp), and `packages/shared` (Zod schemas and TypeScript interfaces). The public site renders in Arabic (RTL default) and English (LTR) with dark mode default, client acquisition funnels, and an SQLite-backed inquiry engine, while a protected `/admin` route allows managing projects, inquiries, posts, and settings.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Fastify, better-sqlite3, Drizzle ORM, Zod, Argon2, Lucide React, Sharp, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-07-an-dev-website-prd.md`

## Global Constraints

- Direction & Languages: Arabic RTL default (`dir="rtl"`), English LTR (`dir="ltr"`).
- Color Palette: `--bg`: `#050816` (Dark) / `#F4F7FD` (Light); `--surface`: `#0B1430` / `#FFFFFF`; `--primary`: `#0D6EFD`; `--accent`: `#00C3FF` / `#0087B8`; `--ink`: `#E6E6E6` / `#0B1226`; `--mute`: `#8D99B3` / `#4B5878`; `--line`: `#1A2850` / `#C9D6F2`.
- Typography: Cairo for Arabic; Poppins / Inter for English; system monospace for code blocks.
- Security: Argon2 password hashing, HttpOnly session cookies, Zod validation on all inputs, rate limiting, and honeypot protection on inquiry forms.
- Data Storage: SQLite via `better-sqlite3` in `data/andev.db` using WAL mode.

## Review Focus

1. **Honeypot & Bot Inquiries:** An automated bot submitting the hidden honeypot field or malformed payloads must receive an immediate rejection without writing to the database.
2. **Bilingual Content Integrity:** Projects and blog posts must correctly store and return both Arabic and English text without crashes if one language field is empty or partially populated.
3. **Session Cookie Security:** Admin endpoints must strictly reject unauthenticated requests, expired sessions, and forged session cookies with HTTP 401.
4. **Responsive Layout Boundaries:** Key components (Hero code block, inquiry form, admin data tables) must not break or cause horizontal overflow on mobile screens down to 360px.
5. **Database WAL Concurrency:** Concurrent reads (visitor traffic) and writes (new inquiries or admin updates) on SQLite must not lock the database or drop submissions.

---

### Task 1: Monorepo Setup & Shared Validation Schemas

**Files:**
- Create: `package.json`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/schemas/inquiry.ts`
- Create: `packages/shared/src/schemas/project.ts`
- Create: `packages/shared/src/schemas/post.ts`
- Create: `packages/shared/src/schemas/auth.ts`
- Create: `packages/shared/src/schemas/settings.ts`
- Create: `packages/shared/src/types.ts`
- Create: `packages/shared/src/index.ts`
- Test: `packages/shared/src/schemas/inquiry.test.ts`

**Interfaces:**
- Produces: `InquirySchema`, `CreateInquiryInput`, `ProjectSchema`, `CreateProjectInput`, `LoginSchema`, `LoginInput`, `PostSchema`, `SettingsSchema`.

- [ ] **Step 1: Write the failing test for shared inquiry validation**

```typescript
// packages/shared/src/schemas/inquiry.test.ts
import { describe, it, expect } from "vitest";
import { InquirySchema } from "./inquiry";

describe("InquirySchema", () => {
  it("validates valid inquiry input", () => {
    const valid = {
      name: "Ahmed Benali",
      email: "ahmed@example.com",
      project_type: "web",
      budget_range: "50k-100k DZD",
      message: "نحتاج إلى موقع تعريفي مع لوحة تحكم لإدارة الطلبات",
      honeypot: ""
    };
    const result = InquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("fails if honeypot is filled", () => {
    const botPayload = {
      name: "Spam Bot",
      email: "bot@spam.com",
      project_type: "web",
      message: "Check out this link",
      honeypot: "http://spam.ru"
    };
    const result = InquirySchema.safeParse(botPayload);
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -w @andev/shared` or `npx vitest run packages/shared`
Expected: FAIL with missing module/schema.

- [ ] **Step 3: Implement Monorepo root and `packages/shared`**

Initialize root `package.json` with npm workspaces (`apps/*`, `packages/*`).
Implement Zod schemas in `packages/shared/src/schemas/`:
- `inquiry.ts`: validates name (min 2), email, project_type enum (`web`, `mobile`, `system`, `other`), budget_range (optional), message (min 10), honeypot (must be empty string).
- `project.ts`: slug, title_ar, title_en, summary_ar, summary_en, body_ar, body_en, tech_json (string array), cover_image, live_url, repo_url, featured, published, sort_order.
- `post.ts`: slug, title_ar, title_en, body_md_ar, body_md_en, published.
- `auth.ts`: email, password.
- `settings.ts`: record of key-values.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/shared`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git init
git add package.json packages/shared
git commit -m "feat: initialize monorepo and shared zod validation schemas"
```

---

### Task 2: API Backend Database & Authentication Engine

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/src/db/schema.ts`
- Create: `apps/api/src/db/index.ts`
- Create: `apps/api/src/services/auth.ts`
- Create: `apps/api/src/plugins/auth.ts`
- Create: `apps/api/src/routes/auth.ts`
- Create: `apps/api/src/app.ts`
- Create: `apps/api/src/server.ts`
- Test: `apps/api/src/routes/auth.test.ts`

**Interfaces:**
- Consumes: `LoginSchema`, `LoginInput` from `@andev/shared`.
- Produces: `db` (Drizzle client), `hashPassword(password: string): Promise<string>`, `verifyPassword(hash: string, password: string): Promise<boolean>`, `createSession(adminId: number): Promise<string>`, `validateSession(sessionId: string): Promise<Admin | null>`, `buildApp()`.

- [ ] **Step 1: Write the failing test for auth routes**

```typescript
// apps/api/src/routes/auth.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { db } from "../db";
import { admins } from "../db/schema";
import { hashPassword } from "../services/auth";

describe("Auth Routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    const hash = await hashPassword("admin123456");
    db.insert(admins).values({
      email: "ammar@andev.dz",
      password_hash: hash,
      created_at: new Date().toISOString()
    }).run();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/auth/login succeeds with correct credentials", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "admin123456" }
    });
    expect(res.statusCode).toBe(200);
    expect(res.cookies.some(c => c.name === "andev_session")).toBe(true);
  });

  it("POST /api/auth/login fails with invalid credentials", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "wrong" }
    });
    expect(res.statusCode).toBe(401);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/api/src/routes/auth.test.ts`
Expected: FAIL with app not defined.

- [ ] **Step 3: Implement database schema, Drizzle setup, and auth service**

1. Define `apps/api/src/db/schema.ts` with SQLite tables:
   - `admins`, `sessions`, `projects`, `project_images`, `inquiries`, `posts`, `settings`, `page_views`.
2. Configure `better-sqlite3` with WAL mode enabled (`PRAGMA journal_mode = WAL;`).
3. Implement `apps/api/src/services/auth.ts` with `argon2` for password hashing and verification, and crypto-based random UUID sessions in `sessions` table.
4. Implement Fastify app in `apps/api/src/app.ts` with `@fastify/cookie`, `@fastify/cors`, and session decorator.
5. Implement `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/api/src/routes/auth.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api
git commit -m "feat(api): implement database schema, drizzle setup, and session auth"
```

---

### Task 3: Inquiries API & Abuse Protection

**Files:**
- Create: `apps/api/src/routes/inquiries.ts`
- Create: `apps/api/src/services/email.ts`
- Modify: `apps/api/src/app.ts`
- Test: `apps/api/src/routes/inquiries.test.ts`

**Interfaces:**
- Consumes: `InquirySchema` from `@andev/shared`, `db` from `../db`.
- Produces: `POST /api/inquiries` public route, `sendInquiryNotification(inquiry)`.

- [ ] **Step 1: Write the failing test for inquiry submission**

```typescript
// apps/api/src/routes/inquiries.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { db } from "../db";
import { inquiries } from "../db/schema";

describe("Inquiries API", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/inquiries saves inquiry to database", async () => {
    const payload = {
      name: "Karim",
      email: "karim@business.dz",
      project_type: "mobile",
      budget_range: "100k-300k DZD",
      message: "نريد تطبيق لتوصيل الطلبات مع إشعارات مباشرة",
      honeypot: ""
    };

    const res = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);

    const saved = db.select().from(inquiries).all();
    expect(saved.some(i => i.email === "karim@business.dz")).toBe(true);
  });

  it("POST /api/inquiries rejects spam when honeypot is populated", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: {
        name: "Bot",
        email: "bot@spam.com",
        project_type: "web",
        message: "Spam content",
        honeypot: "not-empty"
      }
    });

    expect(res.statusCode).toBe(400);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/api/src/routes/inquiries.test.ts`
Expected: FAIL with 404 or route not registered.

- [ ] **Step 3: Implement inquiry route with IP hashing and email notification**

1. Register `POST /api/inquiries` in `apps/api/src/routes/inquiries.ts`.
2. Hash visitor IP with SHA-256 (no raw IPs stored).
3. Validate payload with `InquirySchema`.
4. Insert into SQLite `inquiries` table with status `new`.
5. Implement `sendInquiryNotification` service (logs notification in development, triggers nodemailer SMTP if configured).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/api/src/routes/inquiries.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/routes/inquiries.ts apps/api/src/services/email.ts apps/api/src/routes/inquiries.test.ts apps/api/src/app.ts
git commit -m "feat(api): implement inquiries API with honeypot and ip hashing"
```

---

### Task 4: Public Content API & Seed Data

**Files:**
- Create: `apps/api/src/routes/public.ts`
- Create: `apps/api/src/db/seed.ts`
- Modify: `apps/api/src/app.ts`
- Test: `apps/api/src/routes/public.test.ts`

**Interfaces:**
- Produces: `GET /api/projects`, `GET /api/projects/:slug`, `GET /api/posts`, `GET /api/posts/:slug`, `GET /api/settings/public`, `POST /api/views`.

- [ ] **Step 1: Write the failing test for public projects and views**

```typescript
// apps/api/src/routes/public.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { seedDatabase } from "../db/seed";

describe("Public Content API", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/projects returns published projects", async () => {
    const res = await app.inject({ method: "GET", url: "/api/projects" });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.body);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(6);
  });

  it("POST /api/views records a page view", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/views",
      payload: { path: "/projects" }
    });
    expect(res.statusCode).toBe(200);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/api/src/routes/public.test.ts`
Expected: FAIL with routes not found.

- [ ] **Step 3: Implement public content routes and seed script**

1. Create `apps/api/src/db/seed.ts` seeding:
   - 6 high-quality realistic AN DEV projects:
     1. `benaa-erp`: نظام تخطيط موارد ومخزون للمقاولات (Web/System).
     2. `dz-souq-mobile`: تطبيق تسوق إلكتروني متكامل بالدفع المحلي (Mobile).
     3. `chifa-telemed`: منصة استشارات وحجوزات طبية سحابية (Web/API).
     4. `djazair-fleet`: نظام تتبع وإدارة أساطيل النقل عبر GPS (System/IoT).
     5. `agri-scan`: تطبيق تشخيص أمراض المحاصيل بالذكاء الاصطناعي (Mobile/AI).
     6. `safir-crm`: نظام إدارة علاقات العملاء وخدمة ما بعد البيع (Web).
   - Public settings (agency phone/WhatsApp, email `contact@andev.dz`, address `Algeria`, social links).
2. Implement `apps/api/src/routes/public.ts` with routes for projects, posts, settings, and page view incrementing in `page_views`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/api/src/routes/public.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/routes/public.ts apps/api/src/db/seed.ts apps/api/src/routes/public.test.ts apps/api/src/app.ts
git commit -m "feat(api): implement public content API and portfolio seed data"
```

---

### Task 5: Admin Management API & Uploads

**Files:**
- Create: `apps/api/src/routes/admin.ts`
- Create: `apps/api/src/services/upload.ts`
- Modify: `apps/api/src/app.ts`
- Test: `apps/api/src/routes/admin.test.ts`

**Interfaces:**
- Produces: Protected routes `/api/admin/projects`, `/api/admin/inquiries`, `/api/admin/inquiries/:id`, `/api/admin/posts`, `/api/admin/settings`, `/api/admin/stats`, `/api/admin/uploads`.

- [ ] **Step 1: Write the failing test for admin inquiry update and auth protection**

```typescript
// apps/api/src/routes/admin.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { db } from "../db";
import { inquiries, admins } from "../db/schema";
import { hashPassword, createSession } from "../services/auth";

describe("Admin Management API", () => {
  let app: FastifyInstance;
  let sessionCookie: string;
  let inquiryId: number;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();

    const [admin] = db.insert(admins).values({
      email: "boss@andev.dz",
      password_hash: await hashPassword("pass123"),
      created_at: new Date().toISOString()
    }).returning().all();

    const sessionId = await createSession(admin.id);
    sessionCookie = `andev_session=${sessionId}`;

    const [inq] = db.insert(inquiries).values({
      name: "Client",
      email: "c@dz.com",
      project_type: "web",
      message: "Important project",
      status: "new",
      created_at: new Date().toISOString()
    }).returning().all();
    inquiryId = inq.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/admin/inquiries fails without session", async () => {
    const res = await app.inject({ method: "GET", url: "/api/admin/inquiries" });
    expect(res.statusCode).toBe(401);
  });

  it("PATCH /api/admin/inquiries/:id updates status and note with session", async () => {
    const res = await app.inject({
      method: "PATCH",
      url: `/api/admin/inquiries/${inquiryId}`,
      headers: { cookie: sessionCookie },
      payload: { status: "in_progress", admin_note: "تم الاتصال بالعميل هاتفياً" }
    });
    expect(res.statusCode).toBe(200);
    const updated = db.select().from(inquiries).where(eq => eq(inquiries.id, inquiryId)).get();
    expect(updated?.status).toBe("in_progress");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/api/src/routes/admin.test.ts`
Expected: FAIL with 404 or missing routes.

- [ ] **Step 3: Implement admin routes and Sharp WebP upload processor**

1. Add authentication middleware preHandler verifying session cookie.
2. Implement CRUD for projects (insert, update, delete, toggle publish).
3. Implement inquiries management (list with status filter, patch status and admin notes).
4. Implement settings update endpoint.
5. Implement stats endpoint (count new inquiries, total projects, total posts, last 30 days views).
6. Implement `POST /api/admin/uploads` using `@fastify/multipart` and `sharp` to convert uploaded images to WebP and save to `uploads/`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/api/src/routes/admin.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/routes/admin.ts apps/api/src/services/upload.ts apps/api/src/routes/admin.test.ts apps/api/src/app.ts
git commit -m "feat(api): implement admin management endpoints and sharp webp uploader"
```

---

### Task 6: Frontend Setup & Technical Design System

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/index.html`
- Create: `apps/web/src/tokens.css`
- Create: `apps/web/src/index.css`
- Create: `apps/web/src/lib/i18n.tsx`
- Create: `apps/web/src/lib/api.ts`
- Create: `apps/web/src/components/ui/Button.tsx`
- Create: `apps/web/src/components/ui/TechChip.tsx`
- Create: `apps/web/src/components/ui/GlowingCodeBlock.tsx`
- Create: `apps/web/src/components/ui/Toast.tsx`
- Create: `apps/web/src/components/layout/Navbar.tsx`
- Create: `apps/web/src/components/layout/Footer.tsx`
- Create: `apps/web/src/components/layout/Logo.tsx`
- Test: `apps/web/src/components/ui/Button.test.tsx`

**Interfaces:**
- Produces: `I18nProvider`, `useI18n()`, `Button`, `TechChip`, `GlowingCodeBlock`, `Navbar`, `Footer`, `Logo`.

- [ ] **Step 1: Write test for Button component variants and accessibility**

```typescript
// apps/web/src/components/ui/Button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import React from "react";

describe("Button component", () => {
  it("renders with primary variant and correct styling", () => {
    render(<Button variant="primary">ابدأ مشروعك</Button>);
    const btn = screen.getByRole("button", { name: /ابدأ مشروعك/i });
    expect(btn).toBeDefined();
    expect(btn.className).toContain("btn-primary");
  });

  it("shows spinner and is disabled when isLoading", () => {
    render(<Button isLoading>إرسال</Button>);
    const btn = screen.getByRole("button");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/web/src/components/ui/Button.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement Vite, Tailwind, Design Tokens, and Core Components**

1. Setup `apps/web` with Vite, React 19, Tailwind CSS, `@tailwindcss/typography`.
2. Configure `tokens.css` with exact PRD tokens (`--bg`, `--surface`, `--line`, `--ink`, `--mute`, `--primary`, `--accent`, `--ok`, `--warn`, `--err`).
3. Setup `I18nContext` supporting Arabic (`ar`, RTL) and English (`en`, LTR) with localized dictionary for common strings.
4. Implement `Logo.tsx` SVG with clean crisp vectors and code brackets motif.
5. Implement `Navbar.tsx` with sticky blur header, language switcher, theme switcher, and mobile sheet menu.
6. Implement `GlowingCodeBlock.tsx` showcasing terminal/code window with syntax accent and glowing border box-shadow.
7. Implement `Button.tsx`, `TechChip.tsx`, `Footer.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/web/src/components/ui/Button.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web
git commit -m "feat(web): setup vite app with design tokens, i18n, and core ui components"
```

---

### Task 7: Public Pages (Landing, Portfolio, Project Details, Contact)

**Files:**
- Create: `apps/web/src/pages/HomePage.tsx`
- Create: `apps/web/src/pages/ProjectsPage.tsx`
- Create: `apps/web/src/pages/ProjectDetailPage.tsx`
- Create: `apps/web/src/pages/ContactPage.tsx`
- Create: `apps/web/src/components/home/Hero.tsx`
- Create: `apps/web/src/components/home/Services.tsx`
- Create: `apps/web/src/components/home/Process.tsx`
- Create: `apps/web/src/components/home/TechMarquee.tsx`
- Create: `apps/web/src/components/projects/ProjectCard.tsx`
- Create: `apps/web/src/components/contact/InquiryForm.tsx`
- Modify: `apps/web/src/App.tsx`
- Test: `apps/web/src/components/contact/InquiryForm.test.tsx`

**Interfaces:**
- Produces: `/`, `/projects`, `/projects/:slug`, `/contact` routes.

- [ ] **Step 1: Write test for InquiryForm submission and validation**

```typescript
// apps/web/src/components/contact/InquiryForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InquiryForm } from "./InquiryForm";
import { I18nProvider } from "../../lib/i18n";
import React from "react";

describe("InquiryForm", () => {
  it("renders all required fields in Arabic", () => {
    render(
      <I18nProvider initialLocale="ar">
        <InquiryForm />
      </I18nProvider>
    );
    expect(screen.getByLabelText(/الاسم/i)).toBeDefined();
    expect(screen.getByLabelText(/البريد/i)).toBeDefined();
    expect(screen.getByLabelText(/نوع المشروع/i)).toBeDefined();
    expect(screen.getByLabelText(/تفاصيل الفكرة/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/web/src/components/contact/InquiryForm.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement Public Pages and Components**

1. Build `HomePage.tsx`:
   - Hero section matching PRD wireframe: Title "أفكار نُحوّلها إلى تطبيقات تُحدث فرقاً", subtitle, CTA buttons, Glowing Code Window (`// code.ts` / `build(idea)`).
   - Services section: Clean rows (Web apps, Mobile apps, APIs & custom systems) with blue title and subtle borders.
   - Featured projects grid showcasing top 3 projects with links to full portfolio.
   - Technologies chips/grid (Python, TypeScript, React, Fastify, Flutter, SQLite, PostgreSQL).
   - "كيف نعمل" 3-step structured timeline (1 أفكار وتخطيط, 2 تطوير سريع, 3 إطلاق وتوسّع).
   - WhatsApp & Telegram quick-action banner + CTA.
2. Build `ProjectsPage.tsx`:
   - Filter chips (الكل, تطبيقات الويب, تطبيقات الموبايل, أنظمة مخصصة).
   - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop) of `ProjectCard.tsx` with 16:10 aspect ratio and tag chips.
3. Build `ProjectDetailPage.tsx`:
   - Back button, project title, tech tags, live link & repository link buttons.
   - Large cover image and screenshot gallery with click-to-zoom.
   - Structured sections: التحدي (Challenge), الحل (Solution), النتيجة (Outcome).
   - Navigation to previous/next project and "لديك فكرة مشابهة؟" CTA.
4. Build `ContactPage.tsx`:
   - Two columns: Left with Algeria location, email (`contact@andev.dz`), WhatsApp/Telegram direct buttons, and GitHub/social links.
   - Right with `InquiryForm.tsx` (Zod validation, honeypot field hidden with CSS, loading state, success message with 2-day reply promise).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/web/src/components/contact/InquiryForm.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages apps/web/src/components/home apps/web/src/components/projects apps/web/src/components/contact apps/web/src/App.tsx
git commit -m "feat(web): implement public pages (home, projects, details, contact form)"
```

---

### Task 8: Blog, 404 & SEO Prerender/Meta Tags

**Files:**
- Create: `apps/web/src/pages/BlogPage.tsx`
- Create: `apps/web/src/pages/PostDetailPage.tsx`
- Create: `apps/web/src/pages/NotFoundPage.tsx`
- Create: `apps/web/src/components/seo/MetaTags.tsx`
- Create: `apps/web/public/sitemap.xml`
- Create: `apps/web/public/robots.txt`
- Modify: `apps/web/src/App.tsx`
- Test: `apps/web/src/pages/NotFoundPage.test.tsx`

**Interfaces:**
- Produces: `/blog`, `/blog/:slug`, and `*` (404) routes, `MetaTags` component.

- [ ] **Step 1: Write test for NotFoundPage terminal styling**

```typescript
// apps/web/src/pages/NotFoundPage.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage";
import { MemoryRouter } from "react-router-dom";
import React from "react";

describe("NotFoundPage", () => {
  it("renders 404 message and return home button", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeDefined();
    expect(screen.getByRole("link", { name: /الرئيسية/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/web/src/pages/NotFoundPage.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement Blog, MetaTags, Sitemap, and 404 Page**

1. `BlogPage.tsx`: list of technical posts (with date, reading time, summary in AR/EN).
2. `PostDetailPage.tsx`: article view with reading progress bar, formatted Markdown content, and back navigation.
3. `NotFoundPage.tsx`: terminal-themed screen with `Error: 404_PAGE_NOT_FOUND`, blinking cursor, and button to home.
4. `MetaTags.tsx`: dynamic Open Graph, Twitter Cards, and canonical tags based on route and locale.
5. Create `public/sitemap.xml` and `public/robots.txt`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/web/src/pages/NotFoundPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages/BlogPage.tsx apps/web/src/pages/PostDetailPage.tsx apps/web/src/pages/NotFoundPage.tsx apps/web/src/components/seo apps/web/public
git commit -m "feat(web): implement blog, seo metatags, sitemap, and 404 terminal page"
```

---

### Task 9: Administration Dashboard SPA

**Files:**
- Create: `apps/web/src/pages/admin/AdminLoginPage.tsx`
- Create: `apps/web/src/pages/admin/AdminLayout.tsx`
- Create: `apps/web/src/pages/admin/AdminDashboardPage.tsx`
- Create: `apps/web/src/pages/admin/AdminInquiriesPage.tsx`
- Create: `apps/web/src/pages/admin/AdminProjectsPage.tsx`
- Create: `apps/web/src/pages/admin/AdminProjectEditModal.tsx`
- Create: `apps/web/src/pages/admin/AdminSettingsPage.tsx`
- Modify: `apps/web/src/App.tsx`
- Test: `apps/web/src/pages/admin/AdminInquiriesPage.test.tsx`

**Interfaces:**
- Produces: `/admin/login`, `/admin`, `/admin/inquiries`, `/admin/projects`, `/admin/settings` routes.

- [ ] **Step 1: Write test for Admin Inquiries filtering by status**

```typescript
// apps/web/src/pages/admin/AdminInquiriesPage.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminInquiriesPage } from "./AdminInquiriesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

describe("AdminInquiriesPage", () => {
  it("renders status filter pills", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AdminInquiriesPage />
      </QueryClientProvider>
    );
    expect(screen.getByRole("button", { name: /الكل/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /جديد/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /قيد المتابعة/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/web/src/pages/admin/AdminInquiriesPage.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement Admin Dashboard screens**

1. `AdminLoginPage.tsx`: Clean form with email/password, error feedback, redirection to `/admin` upon success.
2. `AdminLayout.tsx`: Protected route wrapper checking auth via TanStack Query. Sidebar for desktop with icons (Dashboard, Inquiries with new badge count, Projects, Settings, Logout) and bottom navigation bar on mobile.
3. `AdminDashboardPage.tsx`: Overview metric cards (New inquiries, Published projects, Page views), latest inquiries list.
4. `AdminInquiriesPage.tsx`: Table with status badges (New: blue, In Progress: yellow, Closed: gray), inquiry details dialog, status changer, internal note editor, and "رد بالبريد" mailto link.
5. `AdminProjectsPage.tsx` & `AdminProjectEditModal.tsx`: Projects list with sort order, toggle publish/unpublish, delete, and add/edit modal with bilingual AR/EN tabs and image file uploader.
6. `AdminSettingsPage.tsx`: Editor for agency contact info, WhatsApp number, SEO titles.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/web/src/pages/admin/AdminInquiriesPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages/admin
git commit -m "feat(admin): implement complete admin dashboard with inquiries, projects, and settings"
```

---

### Task 10: Full-Stack Integration, Seed Verification & Build

**Files:**
- Create: `apps/web/vite.config.ts` (API proxy configuration)
- Create: `scripts/dev.sh`
- Create: `scripts/build.sh`
- Modify: `package.json`
- Test: `tests/e2e/workflow.test.ts`

**Interfaces:**
- Produces: Integrated end-to-end verification passing all checks and clean production build.

- [ ] **Step 1: Write integration test for the end-to-end user and admin journey**

```typescript
// tests/e2e/workflow.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../apps/api/src/app";
import { FastifyInstance } from "fastify";
import { seedDatabase } from "../../apps/api/src/db/seed";

describe("E2E Integration Journey", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("completes full inquiry submission, admin review, and project retrieval", async () => {
    // 1. Visitor submits project inquiry
    const inquiryRes = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: {
        name: "Omar",
        email: "omar@company.dz",
        project_type: "system",
        message: "We need an internal management system",
        honeypot: ""
      }
    });
    expect(inquiryRes.statusCode).toBe(201);

    // 2. Admin logs in
    const loginRes = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "admin123456" }
    });
    expect(loginRes.statusCode).toBe(200);
    const cookie = loginRes.cookies.find(c => c.name === "andev_session");
    expect(cookie).toBeDefined();

    // 3. Admin reviews inquiries
    const listRes = await app.inject({
      method: "GET",
      url: "/api/admin/inquiries",
      headers: { cookie: `andev_session=${cookie?.value}` }
    });
    expect(listRes.statusCode).toBe(200);
    const list = JSON.parse(listRes.body);
    expect(list.some((i: any) => i.email === "omar@company.dz")).toBe(true);

    // 4. Public visitor fetches portfolio
    const projectsRes = await app.inject({
      method: "GET",
      url: "/api/projects"
    });
    expect(projectsRes.statusCode).toBe(200);
    const projects = JSON.parse(projectsRes.body);
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run tests/e2e/workflow.test.ts`
Expected: PASS

- [ ] **Step 3: Verify TypeScript builds across all workspaces**

Run: `npm run build`
Expected: Successful compile of `packages/shared`, `apps/api`, and `apps/web`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: verify end-to-end integration and successful monorepo build"
```

