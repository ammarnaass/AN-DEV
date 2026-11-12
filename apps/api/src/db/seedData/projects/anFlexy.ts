export const anFlexyProject = {
  slug: "an-flexy",
  title_ar: "AN-Flexy – نظام نقاط بيع ومبيعات الفليكسي وإدارة الديون (الجزائر)",
  title_en: "AN-Flexy - High-Speed Offline POS & Mobile Top-Up Ledger",
  summary_ar: "نظام كاشير وسطح مكتب فائق السرعة لنقاط تعبئة الرصيد الفليكسي في الجزائر، يعمل محلياً 100% بدون إنترنت مع تسجيل المعاملات في أقل من 5 ثوانٍ وإدارة دفتر الكريدي.",
  summary_en: "Dedicated offline-first POS desktop system for Algerian telecom top-up kiosks featuring sub-5s keyboard workflows, debt book, and exact margin audits.",
  body_ar: `
### التحدي الهندسي
أصحاب محلات الهواتف وأكشاك خدمات التعبئة السريعة (الفليكسي) في الجزائر يعتمدون تقليدياً على الدفاتر الورقية أو الذاكرة لتسجيل الشحنات والديون (الكريدي)، مما يؤدي إلى تراكم الديون المنسية، وعدم معرفة هامش الربح اليومي الحقيقي لكل متعامل (Mobilis, Djezzy, Ooredoo)، وبطء الخدمة أثناء أوقات الذروة.

### الحل المعماري المعتمد
1. **معمارية العمل المحلي المستقل (100% Offline-First POS)**: مبني بنظام Electron 40 و Vite و React مع محرك SQLite WAL mode يعمل باستقلالية تامة داخل المحل دون الحاجة لأي اتصال بالإنترنت.
2. **تسجيل العمليات فائق السرعة عبر الكيبورد (≤ 5 ثوانٍ)**: واجهة مستخدم محسنة للعمل عبر اختصارات لوحة المفاتيح حصراً لتسجيل رقم الهاتف والمتعامل والمبلغ دون لمس الفأرة.
3. **الدقة الحسابية بالسنتيم الجزائري (Integer Math)**: تخزين الحسابات بالأعداد الصحيحة (سنتيم ×100) لمنع أخطاء تقريب الفواصل العشرية الشائعة.
4. **دفتر الديون والكريدي الذكي (Credit & Debt Ledger)**: تتبع ديون الزبائن مع إمكانية التسديد الجزئي، كشف حساب لكل زبون، وتوليد تقارير الخزينة والأرباح الصافية اليومية بنقرة واحدة.

### النتائج ومقاييس الأداء
- تسجيل عملية الشحن في أقل من **5 ثوانٍ**.
- مطابقة تامة لرصيد كل متعامل بنسبة **100%** مع الحساب اليدوي.
- صفر فقدان للبيانات بفضل النسخ الاحتياطي التلقائي ومقاومة انقطاع التيار الكهربائي.
`,
  body_en: `
### Engineering Challenge
Mobile top-up (Flexy) kiosks in Algeria frequently record high-frequency transactions and customer credit lines manually in paper ledgers, causing untracked debt accumulations, unverified operator margin calculations, and severe delays during rush hours.

### Architectural Solution
1. **100% Offline-First POS Architecture**: Electron 40, Vite, React 18, and SQLite WAL configured for isolated local execution with zero internet requirements.
2. **Sub-5-Second Keyboard-Only Workflow**: Rapid ergonomic input interface allowing operators to register operator, phone number, and top-up amount strictly using keyboard hotkeys.
3. **Integer Centimes Precision**: All balances stored as integer cents (DZD × 100) preventing floating-point rounding errors across high-volume transactions.
4. **Instant Debt (Credit) Book**: Granular customer credit ledgers with partial payment tracking, customer statements, and one-click daily profit reconciliation.

### Metrics & Outcomes
- Sub-**5-second** transaction throughput per client.
- **100%** reconciliation accuracy across Mobilis, Djezzy, and Ooredoo operator balances.
- Zero data loss during unexpected retail power outages via WAL journaling.
`,
  project_type: "pos",
  version: "v1.0.0",
  package_size: "54 MB Standalone Installer",
  platforms_json: JSON.stringify(["windows", "linux", "pos_terminals"]),
  download_url: "https://github.com/ammarnaass/AN-Flexy/releases",
  enable_live_preview: false,
  cover_image: "/uploads/projects/an-flexy.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/AN-Flexy",
  featured: true,
  published: true,
  sort_order: 8,
  tech_json: JSON.stringify([
    "Electron",
    "Vite",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "Drizzle ORM",
    "SQLite (better-sqlite3)",
    "Zod"
  ]),
  type_specs_json: JSON.stringify({
    execution_mode: "100% Offline-First (Zero cloud dependency, runs isolated in store)",
    speed_benchmark: "Keyboard-only transaction entry in under 5 seconds",
    operators: "Pre-configured for Mobilis, Djezzy, and Ooredoo with custom margin tables",
    accounting_precision: "Integer centimes calculation (x100) preventing rounding discrepancies",
    credit_ledger: "Instant Customer Debt Book (الكريدي) with partial repayment & daily profit audit"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/an-flexy.webp",
      caption_ar: "واجهة كاشير ونقطة بيع AN-Flexy لتسجيل الشحنات وإدارة الديون",
      caption_en: "AN-Flexy POS Interface for Top-Up Recording and Debt Tracking",
      frame_type: "desktop"
    }
  ])
};

