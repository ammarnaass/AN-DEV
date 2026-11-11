export const animeDazeProject = {
  slug: "anime-daze",
  title_ar: "أنمي دايز (ANIME DAZE) — منصة بث الأنمي والجيل الذهبي",
  title_en: "ANIME DAZE - 3D Anime Streaming & Golden Age Media Platform",
  summary_ar: "منصة بث وسائط سينمائية فائقة السرعة لأعمال الأنمي الكلاسيكية مع مشغل فيديو تفاعلي 3D، ومزامنة دقيقة للمشاهدة، وتطبيق أندرويد هجين.",
  summary_en: "Full-stack cinematic media streaming platform featuring a custom 3D player, sub-second watch progress synchronization, and cross-platform Android parity.",
  body_ar: `
### التحدي الهندسي
بناء منصة وسائط ترفيهية متكاملة تقدم تجربة مشاهدة سينمائية غامرة لمسلسل سلام دانك وأعمال الجيل الذهبي، مع توفير مؤثرات بصرية ثلاثية الأبعاد خفيفة تعمل بسلاسة على الهواتف الذكية دون استهلاك الذاكرة، وضمان استمرار عمل المنصة في حال حدوث أي انقطاع لقاعدة البيانات السحابية.

### الحل المعماري المعتمد
1. **معمارية الويب والوسائط المتقدمة (Next.js 16 & React 19)**: استخدام أحدث تقنيات الـ Streaming SSR و React Server Components لعرض الصفحات بشكل فوري.
2. **مشغل فيديو تفاعلي مدعوم بـ Three.js و Framer Motion**: مشغل وسائط متطور يتيح التنقل السلس بين الحلقات، والتحكم بجودة البث واختيار السيرفرات السريعة.
3. **محرك الصمود والتراجع التلقائي (Local JSON Fallback Engine)**: آلية تراجع ذكية تضمن استمرار تصفح ومشاهدة الحلقات حتى أثناء صيانة خادم قاعدة بيانات PostgreSQL.
4. **المزامنة السحابية اللحظية لموضع المشاهدة (Scrubbing Sync)**: حفظ دقيقة المشاهدة ونسبة الإكمال وقائمة المفضلة عبر كافة أجهزة المستخدم بدقة الثانية.
5. **التكافؤ التام عبر المنصات (Cross-Platform Parity)**: تحويل المنصة لتطبيق أندرويد أصيل عبر Capacitor مع الحفاظ على الأداء والسرعة وتكامل إعلانات AdMob غير المزعجة.

### النتائج ومقاييس الأداء
- درجة أداء تفوق **98/100** على مؤشرات Google Lighthouse.
- مزامنة موضع المشاهدة في أقل من **300ms**.
- صفر وقت توقف (Zero-Downtime) بفضل محرك التراجع التلقائي.
`,
  body_en: `
### Engineering Challenge
Delivering a cinematic media streaming experience for classic anime franchises requiring immersive visual fidelity, fluid 3D interactions on constrained mobile devices, and uninterrupted playback continuity during database scaling or maintenance cycles.

### Architectural Solution
1. **Next.js 16 & React 19 Edge Architecture**: Streaming server rendering delivering immediate visual feedback and zero hydration lag.
2. **Three.js Interactive Playback Engine**: Custom video player integrating canvas shaders and smooth Framer Motion transitions.
3. **Resilience & Local Fallback Engine**: Hybrid fallback layer serving serialized JSON snapshots whenever upstream PostgreSQL instances enter maintenance.
4. **Sub-second Scrubbing & Watch Progress Sync**: Micro-batch state persistence tracking exact timestamps across sessions.
5. **Capacitor Mobile Parity**: Packaging the progressive web app into high-performance native Android builds.

### Metrics & Outcomes
- **98+** Lighthouse performance score across mobile and desktop.
- Sub-**300ms** cloud synchronization latency.
- Flawless zero-downtime resilience with automated local fallbacks.
`,
  project_type: "web",
  version: "v2.5.0",
  package_size: "Web App / 14.2 MB Hybrid APK",
  platforms_json: JSON.stringify(["web", "android"]),
  download_url: null,
  enable_live_preview: true,
  cover_image: "/uploads/projects/anime-daze.webp",
  live_url: "https://slam-dunk-w.vercel.app",
  repo_url: "https://github.com/ammarnaass/slam-dunk-w",
  featured: true,
  published: true,
  sort_order: 2,
  tech_json: JSON.stringify([
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Three.js",
    "Framer Motion",
    "Prisma ORM",
    "PostgreSQL",
    "Capacitor",
    "Tailwind CSS"
  ]),
  type_specs_json: JSON.stringify({
    rendering_strategy: "Hybrid SSR & Edge Streaming",
    media_engine: "Custom Video Player with Three.js Interactive Overlays",
    sync_engine: "Sub-second Cloud Watch Progress Synchronization",
    resilience: "Local JSON Fallback Engine during database maintenance",
    mobile_parity: "Capacitor Android wrapper with AdMob integration",
    design_system: "Spacetoon Golden Age Dark Futuristic UI"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/anime-daze.webp",
      caption_ar: "الواجهة الرئيسية لمنصة أنمي دايز",
      caption_en: "ANIME DAZE Platform Home Interface",
      frame_type: "browser"
    },
    {
      url: "/uploads/projects/anime-daze-1.webp",
      caption_ar: "مشغل الحلقات التفاعلي وقائمة التشغيل",
      caption_en: "Interactive Episode Player & Playlist",
      frame_type: "browser"
    },
    {
      url: "/uploads/projects/anime-daze-mobile.webp",
      caption_ar: "تجربة تطبيق الهاتف المحمول عبر Capacitor",
      caption_en: "Mobile App Experience powered by Capacitor",
      frame_type: "phone"
    }
  ])
};
