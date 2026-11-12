export const gePerformanceProject = {
  slug: "ge-performance",
  title_ar: "🏎️ GE Performance – نظام حجز المواعيد وإدارة ورشة السيارات الألمانية (الجزائر)",
  title_en: "GE Performance - German Auto Workshop Operations & Booking Suite",
  summary_ar: "منصة ويب سحابية ومعالج حجز ذكي من 5 خطوات لورشة صيانة وبرمجة السيارات الألمانية في الجزائر، مع مرآب إلكتروني وسجل صيانة ومطابقة العملة واللوحات الجزائرية.",
  summary_en: "High-end automotive workshop management platform and 5-step booking engine engineered for German performance vehicles in Algeria with bilingual support.",
  body_ar: `
### التحدي الهندسي
ورش صيانة وتعديل السيارات الألمانية الفاخرة (BMW, Mercedes-Benz, Audi, Volkswagen, Porsche) في الجزائر تواجه فوضى يومية في جدولة مواعيد الفحص الميكانيكي والبرمجة، وتضارب أوقات المهندسين والفنيين، وصعوبة تتبع السجل التاريخي لأعطال وقطع غيار كل مركبة.

### الحل المعماري المعتمد
1. **معالج حجز مواعيد تفاعلي ذكي (5-Step Booking Wizard)**: اختيار السيارة من المرآب أو إدخال رقم اللوحة الجزائري، تحديد الخدمة والمدة والأسعار بالدينار (DZD)، ومنع تضارب الحجوزات مع إصدار رقم تذكرة مرجعي فوري (\`GEP-2026-XXXX\`).
2. **مرآب العميل وسجل الصيانة الرقمي (Digital Service Logbook)**: ملف شامل لكل سيارة يحتوي على كافة الفحوصات والتدخلات السابقة وتواريخ الصيانة الدورية.
3. **لوحة تحكم وتوزيع المهام الفنية (Workshop Dispatching)**: توزيع ذكي لأوامر العمل على مهندسي التشخيص والميكانيك ومراقبة الطاقة الاستيعابية اليومية للورشة.
4. **التوطين والدعم اللغوي المزدوج (Bilingual Arabic/French)**: دعم كامل للاتجاهين RTL و LTR ومطابقة أرقام الهواتف (05/06/07) واللوحات الترقيمية الجزائرية.

### النتائج ومقاييس الأداء
- القضاء التام على تضارب المواعيد بنسبة **100%**.
- تقليص زمن انتظار العميل عند الاستقبال بنسبة **60%** بفضل التسجيل المسبق للمركبة.
- شفافية كاملة في الأسعار والتقارير الإدارية بالدينار الجزائري.
`,
  body_en: `
### Engineering Challenge
Specialized workshops servicing German luxury and performance vehicles (BMW, Mercedes-Benz, Audi, Porsche) encounter severe bottlenecks in slot scheduling, diagnostic technician dispatching, and historical maintenance record keeping.

### Architectural Solution
1. **5-Step Interactive Booking Wizard**: Guided booking flow with conflict-prevention validation, dynamic service durations, and instantaneous reference ticket generation (\`GEP-2026-XXXX\`).
2. **Digital Garage & Service Logbook**: Comprehensive historical records mapping diagnostics, parts replacements, and warranty coverage to Algerian vehicle registration numbers.
3. **Capacity & Technician Dispatch Dashboard**: Intelligent workload distribution matching job complexity with certified diagnostic specialists.
4. **Algerian Market Localization**: Native bilingual localization (Arabic RTL / French LTR), local currency (DZD), and local mobile validation.

### Metrics & Outcomes
- **100%** eradication of overlapping workshop appointment slots.
- **60%** reduction in customer intake check-in durations.
- Real-time revenue insights and workload monitoring on cloud edge.
`,
  project_type: "web",
  version: "v2.1.0",
  package_size: "Lightweight Edge SSR / PWA",
  platforms_json: JSON.stringify(["web"]),
  download_url: null,
  enable_live_preview: true,
  cover_image: "/uploads/projects/ge-performance.webp",
  live_url: "https://ge-performance.vercel.app",
  repo_url: "https://github.com/ammarnaass/GE-Performance",
  featured: true,
  published: true,
  sort_order: 7,
  tech_json: JSON.stringify([
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Tailwind CSS",
    "Framer Motion",
    "i18n (AR/FR)",
    "Vercel"
  ]),
  type_specs_json: JSON.stringify({
    booking_wizard: "5-Step Interactive Booking Wizard with real-time slot conflict prevention",
    vehicle_logbook: "Digital Maintenance Logbook tailored for Algerian plate numbering (05/06/07)",
    workshop_dispatch: "Technician Workload Balancing & Daily Garage Capacity Optimization",
    localization: "Full Bilingual support (Arabic RTL / French LTR) with Algerian Dinar (DZD) pricing",
    demo_switcher: "Instant Role Switcher (Admin, Reception Staff, Vehicle Owner Customer)"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/ge-performance.webp",
      caption_ar: "الواجهة الرئيسية لمنصة ورشة السيارات الألمانية GE Performance",
      caption_en: "GE Performance German Auto Workshop Main Platform",
      frame_type: "browser"
    }
  ])
};

