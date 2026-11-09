import { getDb, initDb } from "./index";
import { admins, projects, settings, posts } from "./schema";
import { hashPassword } from "../services/auth";
import { eq } from "drizzle-orm";

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
  const defaultSettings: Record<string, string> = {
    email: "contact@andev.dz",
    phone: "+213 550 12 34 56",
    whatsapp: "+213550123456",
    telegram: "andev_dz",
    github: "https://github.com/an-dev",
    linkedin: "https://linkedin.com/company/an-dev-algeria",
    location_ar: "الجزائر العاصمة، الجزائر",
    location_en: "Algiers, Algeria",
    tagline_ar: "نطوّر برمجيات تُحدث فرقاً حقيقياً في أعمالكم",
    tagline_en: "We engineer software that transforms your business"
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await db.insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value } });
  }

  // 3. Seed 6 Showcase Projects
  const showcaseProjects = [
    {
      slug: "benaa-erp",
      title_ar: "نظام بناء ERP لإدارة المقاولات والمشاريع",
      title_en: "Benaa ERP - Enterprise Construction Management",
      summary_ar: "نظام سحابي متكامل لإدارة المشاريع الإنشائية، تتبع التكاليف، وإدارة مخزون المواد بدقة عالية.",
      summary_en: "Comprehensive cloud ERP for construction workflows, budget tracking, and real-time inventory control.",
      body_ar: `
### التحدي
كانت شركات المقاولات تعاني من تشتت بيانات التكاليف بين ملفات Excel والمواقع الميدانية، مما يسبب تأخيرات وتجاوز الميزانيات.

### الحل
طوّرنا نظام بناء ERP كمنصة ويب سريعة تدعم العمل دون انقطاع، مع تقارير مالية لحظية وتتبع دقيق للمشتريات والمعدات.

### النتيجة
- خفض الهدر في المواد بنسبة 28%.
- تسريع إصدار المستخلصات المالية بنسبة 60%.
`,
      body_en: `
### The Challenge
Construction firms struggled with fragmented cost data dispersed across spreadsheets and remote worksites.

### The Solution
We engineered Benaa ERP as a resilient web platform delivering instant financial analytics and real-time inventory tracking.

### The Result
- 28% reduction in material waste.
- 60% faster billing and contractor requisition cycles.
`,
      tech_json: JSON.stringify(["React", "Fastify", "TypeScript", "PostgreSQL", "Docker"]),
      cover_image: "/uploads/projects/benaa-erp-cover.webp",
      live_url: "https://benaa-demo.andev.dz",
      repo_url: "",
      featured: true,
      published: true,
      sort_order: 1
    },
    {
      slug: "dz-souq-mobile",
      title_ar: "تطبيق دزاد سوق للتجارة والتوصيل",
      title_en: "DZ Souq - eCommerce & Local Delivery App",
      summary_ar: "تطبيق موبايل متعدد التجار مع تكامل كامل للدفع عند الاستلام وبطاقات الدفع الجزائرية.",
      summary_en: "Multi-vendor mobile commerce application with localized cash-on-delivery and card payment integration.",
      body_ar: `
### التحدي
صعوبة تجربة الشراء عبر الموبايل في الشبكات الضعيفة، وغياب التكامل السلس مع شركات التوصيل المحلية.

### الحل
بناء تطبيق Flutter فائق السرعة يدعم الوضع دون اتصال بالإنترنت وحفظ السلة محلياً، مع ربط مباشر عبر API مع 5 شركات توصيل وطنية.

### النتيجة
- أكثر من 50,000 عملية تنزيل في أول شهرين.
- معدل استقرار التطبيق 99.8% بدون أخطاء انهيار.
`,
      body_en: `
### The Challenge
Poor checkout performance on low-bandwidth networks and lack of localized delivery carrier integrations.

### The Solution
A Flutter mobile client optimized for offline caching and integrated with 5 Algerian parcel delivery carriers.

### The Result
- 50,000+ downloads within 60 days.
- 99.8% crash-free user sessions.
`,
      tech_json: JSON.stringify(["Flutter", "Dart", "Fastify", "Redis", "SQLite"]),
      cover_image: "/uploads/projects/dz-souq-cover.webp",
      live_url: "https://dzsouq.andev.dz",
      repo_url: "",
      featured: true,
      published: true,
      sort_order: 2
    },
    {
      slug: "chifa-telemed",
      title_ar: "منصة شفاء للحجوزات والاستشارات الطبية",
      title_en: "Chifa - Healthcare Appointment & Telemed",
      summary_ar: "منصة طبية لربط المرضى بالعيادات، مع نظام حجز مواعيد ذكي وإشعارات SMS فورية.",
      summary_en: "Healthcare platform connecting patients with specialized clinics featuring real-time appointment scheduling.",
      body_ar: `
### التحدي
طوابير الانتظار الطويلة في العيادات وضياع سجلات المواعيد الطبية الورقية.

### الحل
نظام حجز إلكتروني منظم بالكامل مع تقويم تفاعلي للطبيب وإشعارات تذكير تلقائية عبر الرسائل النصية.

### النتيجة
- تقليل وقت انتظار المرضى بنسبة 45%.
- خدمة أكثر من 120 عيادة خاصة في عامها الأول.
`,
      body_en: `
### The Challenge
Overcrowded physical waiting rooms and lost paper medical appointment logs.

### The Solution
An automated scheduling portal with an interactive physician calendar and SMS reminders.

### The Result
- 45% reduction in patient waiting durations.
- Adopted by 120+ private clinics across 8 wilayas.
`,
      tech_json: JSON.stringify(["React", "Node.js", "TailwindCSS", "PostgreSQL"]),
      cover_image: "/uploads/projects/chifa-telemed-cover.webp",
      live_url: "https://chifa.andev.dz",
      repo_url: "",
      featured: true,
      published: true,
      sort_order: 3
    },
    {
      slug: "djazair-fleet",
      title_ar: "نظام جزائر فليت لتتبع أساطيل النقل",
      title_en: "Djazair Fleet - Real-time GPS Fleet Telematics",
      summary_ar: "نظام تحكم ومراقبة لحظية للشاحنات والمركبات، تتبع استهلاك الوقود ومسارات الرحلات.",
      summary_en: "Real-time telemetry and route monitoring system for transportation fleets and fuel efficiency.",
      body_ar: `
### التحدي
سرقة الوقود وعدم التزام السائقين بالمسارات المحددة في رحلات النقل الطويلة بين الولايات.

### الحل
لوحة تحكم تفاعلية تستقبل بيانات أجهزة GPS وOBD2 وتعالج أكثر من 1000 نقطة جغرافية في الثانية.

### النتيجة
- توفير 18% من نفقات الوقود شهرياً.
- مراقبة حية لأسطول يتجاوز 400 شاحنة نقل بضائع.
`,
      body_en: `
### The Challenge
Route deviations and unmonitored fuel siphoning across long-haul inter-provincial shipping routes.

### The Solution
An interactive telemetry dashboard ingesting live GPS and OBD2 signals at 1,000+ points/sec.

### The Result
- 18% documented monthly fuel expenditure savings.
- Monitored 400+ logistics trucks continuously.
`,
      tech_json: JSON.stringify(["TypeScript", "WebSockets", "Leaflet", "TimescaleDB", "Fastify"]),
      cover_image: "/uploads/projects/fleet-cover.webp",
      live_url: "https://fleet.andev.dz",
      repo_url: "",
      featured: false,
      published: true,
      sort_order: 4
    },
    {
      slug: "agri-scan",
      title_ar: "تطبيق أغري سكان للتشخيص الزراعي بالذكاء الاصطناعي",
      title_en: "AgriScan - AI Crop Pathology Detection",
      summary_ar: "تطبيق ذكي يساعد الفلاحين على تشخيص أمراض النخيل والحمضيات بمجرد التقاط صورة للورقة.",
      summary_en: "Computer vision mobile assistant diagnosing agricultural plant diseases instantly from smartphone camera photos.",
      body_ar: `
### التحدي
صعوبة وصول المهندسين الزراعيين إلى المزارع المعزولة في الجنوب لتشخيص أمراض سوسة النخيل واللفحة مبكراً.

### الحل
نموذج ذكاء اصطناعي خفيف يعمل مباشرة على هاتف المزارع لتحديد نوع المرض واقتراح العلاج المناسب فوراً.

### النتيجة
- دقة تشخيص بلغت 94.2% على 15 مرضاً شائعاً في الجزائر.
- تم إنقاذ أكثر من 2,000 هكتار من بساتين النخيل من التفشي المبكر.
`,
      body_en: `
### The Challenge
Scarcity of on-site agronomists in remote desert oases leading to delayed crop pest diagnosis.

### The Solution
An on-device lightweight computer vision model identifying crop pathogens from field photographs.

### The Result
- 94.2% validated diagnostic precision across 15 native agricultural diseases.
- Prevented crop loss across 2,000+ hectares of date palm orchards.
`,
      tech_json: JSON.stringify(["Flutter", "TensorFlow Lite", "Python", "Fastify"]),
      cover_image: "/uploads/projects/agriscan-cover.webp",
      live_url: "",
      repo_url: "https://github.com/an-dev/agri-scan",
      featured: false,
      published: true,
      sort_order: 5
    },
    {
      slug: "safir-crm",
      title_ar: "نظام سفير لإدارة علاقات العملاء وخدمات ما بعد البيع",
      title_en: "Safir CRM - Client Relationship & Ticket System",
      summary_ar: "منصة CRM مرنة مخصصة للشركات الخدمية لتتبع دورة حياة العميل وتذاكر الدعم الفني.",
      summary_en: "Modular CRM platform designed for service companies to track customer lifecycle and support tickets.",
      body_ar: `
### التحدي
ضياع استفسارات العملاء وبطء الاستجابة لطلبات الصيانة بسبب الاعتماد على المحادثات الفردية.

### الحل
نظام تذاكر مركزي يصنف الطلبات تلقائياً ويوجهها للموظف المناسب مع قياس مؤشرات الأداء (SLA).

### النتيجة
- تقليل زمن إغلاق التذاكر من 24 ساعة إلى أقل من 3 ساعات.
- ارتفاع رضا العملاء بنسبة 35%.
`,
      body_en: `
### The Challenge
Customer inquiries lost across unmonitored messaging apps, causing slow ticket resolutions.

### The Solution
A centralized ticketing desk with automatic escalation rules and SLA compliance analytics.

### The Result
- Average ticket resolution time reduced from 24h to < 3h.
- 35% increase in customer satisfaction scores.
`,
      tech_json: JSON.stringify(["React", "Fastify", "TailwindCSS", "PostgreSQL"]),
      cover_image: "/uploads/projects/safir-crm-cover.webp",
      live_url: "https://safir.andev.dz",
      repo_url: "",
      featured: false,
      published: true,
      sort_order: 6
    }
  ];

  for (const p of showcaseProjects) {
    const [existing] = await db.select().from(projects).where(eq(projects.slug, p.slug));
    if (!existing) {
      await db.insert(projects).values({
        ...p,
        created_at: now,
        updated_at: now
      });
    }
  }

  // 4. Seed Blog Post
  const samplePost = {
    slug: "building-high-performance-apps-in-algeria",
    title_ar: "كيف نبني تطبيقات ويب سريعة تلائم سرعة الإنترنت في الجزائر",
    title_en: "Engineering High-Performance Web Applications for Algerian Network Conditions",
    body_md_ar: `
في AN DEV، نعتبر سرعة التحميل ميزة تنافسية وليست مجرد خيار ثانوي. عندما تصمم تطبيقاً يستهدِف السوق الجزائري، يجب أن تضع في الحسبان تقلبات شبكات 3G/4G في مختلف الولايات.

### الاستراتيجيات الثلاث التي نطبقها:
1. **الاعتماد على صيغ صور حديثة (WebP/AVIF)**: خفض حجم الصور بأكثر من 70% دون المساس بالجودة.
2. **تقسيم الكود (Code Splitting)**: لا تحمّل المتصفح مكتبات لا يحتاجها إلا في صفحات ثانوية.
3. **التخزين المؤقت الذكي (Smart Caching)**: تخزين الأصول الثابتة عبر Reverse Proxy مثل Caddy مع ترويسات Cache-Control لا تتغير.
`,
    body_md_en: `
At AN DEV, web performance is a core competitive requirement rather than an afterthought. When designing digital solutions for the Algerian market, varying mobile network speeds across provinces must be accommodated.

### Key Architectural Approaches:
1. **Modern Compressed Media (WebP)**: Reducing image payloads by 70% without perceptual fidelity loss.
2. **Route-Level Code Splitting**: Loading components on-demand.
3. **Immutable Caching Headers**: Serving static assets directly from edge reverse proxies.
`,
    published: true,
    published_at: now
  };

  const [existingPost] = await db.select().from(posts).where(eq(posts.slug, samplePost.slug));
  if (!existingPost) {
    await db.insert(posts).values(samplePost);
  }
}

if (process.argv[1]?.endsWith("seed.ts")) {
  seedDatabase().then(() => {
    console.log("Database seeded successfully on Neon PostgreSQL with AN DEV showcase projects!");
    process.exit(0);
  }).catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
}
