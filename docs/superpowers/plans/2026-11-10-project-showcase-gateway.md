# Project Showcase, Live Preview Gateway & App Specifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the AN DEV portfolio and project case studies into an interactive application showcase featuring an executive technical specifications strip (app type, version, package size, supported OS platform badges), an interactive live preview gateway with multi-device viewport switching (Desktop, Tablet, Mobile) and CSP fallback, a context-aware device frame mockup gallery with Lightbox zoom inspection, and full administrative CRUD management.

**Architecture:** Monorepo architecture spanning `@andev/shared` (extended `ProjectSchema` with specifications, platforms, and gallery JSON), `apps/api` (PostgreSQL/Neon Drizzle schema and migrations for extended project attributes), and `apps/web` (modular UI components: `ProjectSpecsStrip`, `ProjectLiveGateway`, `ProjectScreenshotGallery`, `ProjectSpecsFields`, and `ProjectGalleryManager`). The live gateway employs a sandboxed iframe with fluid desktop/tablet/mobile viewport emulation, while native mobile and desktop applications render inside realistic hardware device frames.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Fastify, Drizzle ORM, Neon PostgreSQL, Zod, Vitest.

**Spec:** `design_draft.md` (Section 6 & CUJ 6/7)

## Global Constraints

- **Direction & Locale:** Arabic RTL default (`dir="rtl"`), English LTR (`dir="ltr"`).
- **Design Tokens:** Strict alignment with `tokens.css` (`--bg`, `--surface`, `--surface-container`, `--line`, `--secondary`, `--text-primary`, `--text-muted`).
- **Platform Matrix:** Dedicated SVG badges for `android`, `ios`, `windows`, `macos`, `linux`, `web`, and `pos_terminals`.
- **Iframe Sandboxing & Security:** Live preview iframe uses `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"` with graceful CSP/X-Frame-Options fallback detection and a direct launcher button.
- **Data Integrity:** Fully backward-compatible schema extensions with default values; existing projects remain 100% valid.

## Review Focus

1. **Third-Party Iframe Blocking (X-Frame-Options / CSP):** Web applications that prohibit iframe embedding must not display an ugly broken blank area; the gateway must detect framing failures or timeout and present an elegant fallback card with a direct launch action.
2. **Mobile Screen Responsiveness:** On narrow mobile screens (down to 360px width), the viewport switcher and device mockup shells must resize smoothly without causing page-level horizontal scrolling.
3. **Gallery Lightbox Trapping & Accessibility:** The Lightbox modal must handle keyboard navigation (Escape to close, Left/Right arrow keys for navigation) and maintain focus trapping with scroll lock on `document.body`.
4. **Bilingual Spec Labels:** Version, file size, platforms, and device frames must render natural localized terminology in both Arabic and English without clipping or layout breakages.
5. **Admin JSON Serialization:** Platform arrays and gallery screenshot objects must parse and serialize safely without runtime crashes when editing or creating projects.

---

### Task 1: Shared Schemas & Database Migration

**Files:**
- Modify: `packages/shared/src/schemas/project.ts`
- Modify: `packages/shared/src/types.ts`
- Modify: `apps/api/src/db/schema.ts`
- Modify: `apps/api/src/db/index.ts`
- Modify: `apps/api/src/routes/admin.ts`
- Test: `packages/shared/src/schemas/project.test.ts`

- [ ] **Step 1: Write test for extended ProjectSchema attributes**

```typescript
// packages/shared/src/schemas/project.test.ts
import { describe, it, expect } from "vitest";
import { ProjectSchema } from "./project";

describe("Extended ProjectSchema", () => {
  it("validates project with technical specifications and platforms", () => {
    const input = {
      slug: "test-app",
      title_ar: "تطبيق تجريبي",
      summary_ar: "ملخص تجريبي لتطبيق متكامل",
      body_ar: "تفاصيل وحلول معمارية دقيقة للمشروع...",
      project_type: "mobile",
      version: "v2.1.0",
      package_size: "32.4 MB",
      platforms_json: ["android", "ios"],
      download_url: "https://example.com/download.apk",
      enable_live_preview: false,
      gallery_json: [
        { url: "/uploads/screen1.webp", caption_ar: "شاشة الدخول", device_frame: "mobile" }
      ],
      cover_image: "/uploads/cover.webp"
    };

    const parsed = ProjectSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.project_type).toBe("mobile");
      expect(parsed.data.platforms_json).toEqual(["android", "ios"]);
      expect(parsed.data.gallery_json.length).toBe(1);
    }
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**
- [ ] **Step 3: Update `packages/shared/src/schemas/project.ts` and `types.ts`**
  - Add `project_type: z.enum(["web", "mobile", "desktop", "pos", "system"]).default("web")`
  - Add `version: z.string().default("v1.0.0")`
  - Add `package_size: z.string().default("")`
  - Add `platforms_json: z.array(z.string()).default(["web"])`
  - Add `download_url: z.string().optional().nullable().default("")`
  - Add `enable_live_preview: z.boolean().default(true)`
  - Add `gallery_json: z.array(z.object({ url: z.string(), caption_ar: z.string().optional(), caption_en: z.string().optional(), device_frame: z.enum(["mobile", "browser", "desktop"]).default("browser") })).default([])`
- [ ] **Step 4: Update `apps/api/src/db/schema.ts` and `apps/api/src/db/index.ts`**
  - Add `project_type`, `version`, `package_size`, `platforms_json`, `download_url`, `enable_live_preview`, and `gallery_json` columns to `projects` table.
  - Add `ALTER TABLE projects ADD COLUMN IF NOT EXISTS ...` migration queries in `initDb()`.
- [ ] **Step 5: Run tests and ensure schema test passes**
- [ ] **Step 6: Commit Task 1 changes**

---

### Task 2: Project Specifications Strip Component (`ProjectSpecsStrip.tsx`)

**Files:**
- Create: `apps/web/src/features/portfolio/components/ProjectSpecsStrip.tsx`
- Create: `apps/web/src/features/portfolio/components/PlatformIcon.tsx`
- Test: `apps/web/src/features/portfolio/tests/ProjectSpecsStrip.test.tsx`

- [ ] **Step 1: Write component test for `ProjectSpecsStrip`**
  - Test rendering of version badge, package size indicator, app type badge, platform icons row (Android, iOS, Windows, Web, etc.), and download button.
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `PlatformIcon.tsx`**
  - Render crisp SVG brand icons for `android`, `ios`, `windows`, `macos`, `linux`, `web`, and `pos_terminals` with tooltips.
- [ ] **Step 4: Implement `ProjectSpecsStrip.tsx`**
  - Format release version, size pill, download action link, and type chip in a high-density, dark/light theme aware responsive bar.
- [ ] **Step 5: Run tests and confirm they pass**
- [ ] **Step 6: Commit Task 2 changes**

---

### Task 3: Interactive Live Preview Gateway (`ProjectLiveGateway.tsx`)

**Files:**
- Create: `apps/web/src/features/portfolio/components/ProjectLiveGateway.tsx`
- Test: `apps/web/src/features/portfolio/tests/ProjectLiveGateway.test.tsx`

- [ ] **Step 1: Write component test for `ProjectLiveGateway`**
  - Test desktop, tablet, and mobile viewport switching controls.
  - Test external launch fallback rendering.
- [ ] **Step 2: Run test to confirm it fails**
- [ ] **Step 3: Implement `ProjectLiveGateway.tsx`**
  - Add state for `viewport: "desktop" | "tablet" | "mobile"`.
  - Add state for `isFullscreen: boolean`.
  - Add iframe container with smooth transitions between widths (100%, 768px, 390px).
  - Add reload button and full new window trigger.
  - Add CSP fallback timer: if iframe does not emit load event within 5s or if error occurs, provide a prominent one-click external launcher card with project live preview snapshot.
- [ ] **Step 4: Run test and confirm it passes**
- [ ] **Step 5: Commit Task 3 changes**

---

### Task 4: Device Frame Mockup Gallery & Lightbox (`ProjectScreenshotGallery.tsx`)

**Files:**
- Create: `apps/web/src/features/portfolio/components/ProjectScreenshotGallery.tsx`
- Create: `apps/web/src/features/portfolio/components/DeviceFrame.tsx`
- Create: `apps/web/src/features/portfolio/components/ScreenshotLightbox.tsx`
- Test: `apps/web/src/features/portfolio/tests/ProjectScreenshotGallery.test.tsx`

- [ ] **Step 1: Write component test for `ProjectScreenshotGallery` and `ScreenshotLightbox`**
  - Test device mockup shells rendering.
  - Test opening lightbox on click and keyboard escape/arrow handlers.
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `DeviceFrame.tsx`**
  - `mobile`: Smartphone bezel with camera notch, rounded corners, and shadow.
  - `browser`: macOS/Chrome style window top bar with colored dots and simulated URL bar.
  - `desktop`: Clean monitor bezel with bottom stand.
- [ ] **Step 4: Implement `ScreenshotLightbox.tsx`**
  - Fullscreen overlay with backdrop blur, caption bar, prev/next arrows, and close button.
  - Keyboard listener: `Escape` closes, `ArrowRight`/`ArrowLeft` steps through images.
- [ ] **Step 5: Implement `ProjectScreenshotGallery.tsx`**
  - Render list of screenshots wrapped in appropriate device frames with hover zoom effects.
- [ ] **Step 6: Run test and confirm it passes**
- [ ] **Step 7: Commit Task 4 changes**

---

### Task 5: Upgraded Administrative Showcase Controls

**Files:**
- Create: `apps/web/src/features/admin/components/ProjectSpecsFields.tsx`
- Create: `apps/web/src/features/admin/components/ProjectGalleryManager.tsx`
- Modify: `apps/web/src/features/admin/components/ProjectEditModal.tsx`
- Test: `apps/web/src/features/admin/tests/ProjectSpecsFields.test.tsx`

- [ ] **Step 1: Write test for `ProjectSpecsFields` form inputs**
  - Verify selection of project type, version, package size, platform checkboxes, and download link.
- [ ] **Step 2: Implement `ProjectSpecsFields.tsx`**
  - Add dropdown for `project_type` (`web`, `mobile`, `desktop`, `pos`, `system`).
  - Add text inputs for `version` and `package_size`.
  - Add interactive multi-select grid of platform checkboxes (`Android`, `iOS`, `Windows`, `macOS`, `Linux`, `Web`, `POS Terminals`).
  - Add input for `download_url` and toggle for `enable_live_preview`.
- [ ] **Step 3: Implement `ProjectGalleryManager.tsx`**
  - Manage array of screenshot objects: add image by URL or file upload, choose device frame (`mobile`, `browser`, `desktop`), add Arabic/English captions, remove image, reorder.
- [ ] **Step 4: Update `ProjectEditModal.tsx`**
  - Organize modal into intuitive tabs: "المحتوى والترجمة" (Content & Translations), "المواصفات والمنصات" (Specs & Platforms), and "المعاينة والمعرض" (Live Preview & Gallery).
  - Connect `ProjectSpecsFields` and `ProjectGalleryManager`.
- [ ] **Step 5: Run tests and ensure admin tests pass**
- [ ] **Step 6: Commit Task 5 changes**

---

### Task 6: Case Study & Portfolio Grid Integration

**Files:**
- Modify: `apps/web/src/features/portfolio/pages/ProjectDetailPage.tsx`
- Modify: `apps/web/src/features/portfolio/pages/ProjectsPage.tsx`
- Modify: `apps/web/src/features/portfolio/components/ProjectCard.tsx`
- Test: `apps/web/src/features/portfolio/tests/ProjectsPage.test.tsx`

- [ ] **Step 1: Write integration test for `ProjectDetailPage` with specs and gateway**
- [ ] **Step 2: Update `ProjectDetailPage.tsx`**
  - Render `ProjectSpecsStrip` below header.
  - If `enable_live_preview` is true and `live_url` exists, render `ProjectLiveGateway`.
  - If `gallery_json` has items, render `ProjectScreenshotGallery`.
- [ ] **Step 3: Update `ProjectsPage.tsx`**
  - Update filter pills to filter by `project_type` (`all`, `web`, `mobile`, `desktop`, `pos`, `system`).
- [ ] **Step 4: Update `ProjectCard.tsx`**
  - Display project type badge, version badge, and supported platform icons row on each portfolio card.
- [ ] **Step 5: Run tests to verify full portfolio integration**
- [ ] **Step 6: Commit Task 6 changes**

---

### Task 7: End-to-End Verification & AN POS Live Showcase Enhancement

**Files:**
- Modify: Neon DB `projects` record for `anpos` (populate version `v2.4.0`, size `48 MB`, type `pos`, platforms `["windows", "android", "pos_terminals", "web"]`, live demo URL, and device frames gallery)
- Test: `tests/e2e/workflow.test.ts`

- [ ] **Step 1: Execute database migration and update `anpos` project with rich specifications**
- [ ] **Step 2: Run full Vitest test suite (`npx vitest run`) across all workspaces**
- [ ] **Step 3: Run full TypeScript check and Vite build (`npm run build`)**
- [ ] **Step 4: Verify live rendering of specs strip, live preview gateway, and device mockup gallery**
- [ ] **Step 5: Commit and push changes to `main`**

