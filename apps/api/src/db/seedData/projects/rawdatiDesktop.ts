export const rawdatiDesktopProject = {
  slug: "rawdati-desktop",
  title_ar: "روضتي (Rawdati Desktop) — نظام إدارة روضة أطفال لسطح المكتب",
  title_en: "Rawdati Desktop - Offline-First Kindergarten Management System",
  summary_ar: "نظام مكتبي متكامل لإدارة رياض الأطفال يعمل محلياً 100% بدون إنترنت، يدير تسجيل الأطفال، الاشتراكات والرسوم المالية، وحضور الكادر مع طباعة التقارير.",
  summary_en: "Comprehensive offline-first desktop management suite for kindergartens featuring tuition billing, child records, attendance tracking, and secured IPC.",
  body_ar: `
### التحدي الهندسي
تحتاج مؤسسات التعليم المبكر ورياض الأطفال إلى نظام إداري ومالي سريع للغاية يحمي خصوصية وسجلات الأطفال وعائلاتهم، ويعمل باستقلالية كاملة عن شبكة الإنترنت لتفادي أي انقطاعات أثناء أوقات الدوام الرسمي، مع توفير واجهة مستخدم عربية بديهية ومريحة للعاملين.

### الحل المعماري المعتمد
1. **معمارية العمل المحلي المستقل (100% Offline-First Architecture)**: بناء النظام بالكامل عبر Electron 40 و Vite و React، بحيث يتم تخزين كافة البيانات محلياً على جهاز الروضة بدون أي اتصال خارجي.
2. **محرك قاعدة بيانات محلي فائق السرعة (SQLite WAL Mode)**: استخدام SQLite عبر مكتبة \`better-sqlite3\` مع تفعيل وضع Write-Ahead Logging لضمان أداء قراءة وكتابة فوري بدون أي قفل أو بطء.
3. **طبقة IPC مؤمّنة بالكامل عبر Zod**: عزل تام بين العملية الرئيسية (Main Process) وعملية العرض (Renderer Process) عبر جسر \`contextBridge\` بقائمة بيضاء للقنوات ومخططات تحقق صارمة.
4. **نظام الفوترة وطباعة التقارير المدمج**: توليد فوري لإيصالات الاستلام، بطاقات الأطفال (CR80/QR)، وكشوفات الحسابات الشهرية بصيغتي PDF و Excel.

### النتائج ومقاييس الأداء
- انعدام كامل لزمن الاستجابة الشبكي (**0ms Network Latency**).
- أمان وخصوصية بنسبة **100%** حيث لا تغادر أي بيانات جهاز الروضة.
- سرعة إقلاع التطبيق في أقل من **1.5 ثانية**.
`,
  body_en: `
### Engineering Challenge
Early education institutions require localized administrative and financial software that preserves student privacy, operates reliably without internet connectivity, and accelerates daily tasks like attendance recording and tuition invoicing.

### Architectural Solution
1. **100% Offline-First Desktop Architecture**: Electron 40, Vite, and React 18 bundled into lightweight standalone desktop executables requiring zero cloud services.
2. **High-Throughput SQLite WAL Engine**: \`better-sqlite3\` configured with Write-Ahead Logging and Drizzle ORM schema migrations for zero-corruption transactions.
3. **Hardened IPC Bridge**: Strict unidirectional IPC communication using \`contextBridge\` and Zod contract validators protecting operating system access.
4. **Automated Document Synthesis**: Native PDF and Excel generation for student identity badges, tuition invoices, and monthly accounting ledgers.

### Metrics & Outcomes
- **0ms** network latency with instantaneous UI responses.
- Complete data sovereignty with zero external telemetry.
- Cold boot time under **1.5s** on standard desktop hardware.
`,
  project_type: "desktop",
  version: "v1.2.0",
  package_size: "68 MB Standalone Installer",
  platforms_json: JSON.stringify(["windows", "linux"]),
  download_url: "https://github.com/ammarnaass/Kindergarten-Management-System/releases",
  enable_live_preview: false,
  cover_image: "/uploads/projects/rawdati-desktop.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/Kindergarten-Management-System",
  featured: true,
  published: true,
  sort_order: 3,
  tech_json: JSON.stringify([
    "Electron 40",
    "React 18",
    "TypeScript",
    "SQLite (better-sqlite3)",
    "Drizzle ORM",
    "Vite",
    "Tailwind CSS",
    "Zod",
    "Zustand"
  ]),
  type_specs_json: JSON.stringify({
    execution_mode: "100% Offline-First (No external server required)",
    database_engine: "SQLite WAL Mode via better-sqlite3",
    ipc_security: "Strict contextBridge with whitelisted channels & Zod schemas",
    modules: [
      "إدارة تسجيل وقبول الأطفال والوثائق",
      "إدارة الاشتراكات والرسوم والأقساط الشهرية",
      "تسجيل حضور وغياب الأطفال والكادر التربوي",
      "توليد وطباعة التقارير المالية والإدارية (PDF/Excel)"
    ],
    packaging: "Windows Portable & NSIS Installer, AppImage for Linux"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/rawdati-desktop.webp",
      caption_ar: "لوحة التحكم الرئيسية لنظام روضتي",
      caption_en: "Rawdati Desktop Main Dashboard",
      frame_type: "desktop"
    },
    {
      url: "/uploads/projects/rawdati-screen-1.webp",
      caption_ar: "سجل متابعة الأطفال والبيانات التربوية",
      caption_en: "Children Educational Tracking & Records",
      frame_type: "desktop"
    },
    {
      url: "/uploads/projects/rawdati-screen-2.webp",
      caption_ar: "إدارة الاشتراكات والتقارير المالية والطباعة",
      caption_en: "Financial Subscriptions & Reports Generation",
      frame_type: "desktop"
    }
  ])
};
