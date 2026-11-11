export const shopCoachFouadProject = {
  slug: "shop-coach-fouad",
  title_ar: "متجر كوتش فؤاد — منصة تجارة إلكترونية سحابية متكاملة",
  title_en: "Shop Coach Fouad - Modular E-Commerce Platform",
  summary_ar: "متجر إلكتروني احترافي مبني بمعمارية الموديولات (Modular Architecture) مع دعم متعدد اللغات والعملات، الشراء الفوري، وإدارة المخزون والطلبات.",
  summary_en: "High-performance enterprise e-commerce platform built with modular domain architecture, instant checkout, multi-currency support, and inventory tracking.",
  body_ar: `
### التحدي الهندسي
تتطلب متاجر التجارة الإلكترونية الرياضية والتسويقية استجابة فائقة للطلبات المتزامنة خلال حملات إطلاق المنتجات، وتوفير تجربة شراء فورية لتقليل التخلي عن سلة التسوق (Cart Abandonment)، مع الحاجة لبنية معمارية قابلة للتوسع والتعديل دون الإخلال ببقية أجزاء المتجر.

### الحل المعماري المعتمد
1. **معمارية الموديولات المستقلة (Modular Architecture)**: تقسيم المنصة إلى 13 موديولاً مستقلاً (\`Catalog\`, \`Cart\`, \`Checkout\`, \`Orders\`, \`Payments\`, \`Shipping\`, \`Coupons\`, \`InstantBuy\`, \`Wishlist\`, \`CMS\`, \`Dashboard\`). كل موديول يحتوي على مساراته ونماذجه وخدماته المعزولة.
2. **الشراء الفوري السريع (Instant Buy Engine)**: مسار شراء فوري بنقرة واحدة متصل بنظام الفوترة الإلكترونية وحساب تكلفة التوصيل لحظياً.
3. **التخزين المؤقت الذكي (Redis Caching Layer)**: تخزين مصفوفة المنتجات الأكثر طلباً وجلسات المستخدمين لتقليل الاستعلامات على قاعدة بيانات MySQL.
4. **نظام الصلاحيات والأدوار متعدد المستويات (RBAC)**: إدارة دقيقة لصلاحيات مديري الفروع ومسؤولي التوصيل وخدمة العملاء.

### النتائج ومقاييس الأداء
- انخفاض زمن تحميل صفحات المنتجات إلى أقل من **120ms**.
- ارتفاع معدل إتمام عمليات الشراء الفورية بنسبة **35%**.
- عزل كامل للأخطاء البرمجية بفضل استقلالية موديولات النظام.
`,
  body_en: `
### Engineering Challenge
Modern fitness and merchandise e-commerce platforms demand zero-latency catalog browsing, robust concurrency handling during flash sales, and minimal friction during checkout to maximize conversion rates across diverse customer segments.

### Architectural Solution
1. **Domain-Driven Modular Architecture**: Clean separation into 13 self-contained modules (\`Catalog\`, \`Cart\`, \`Checkout\`, \`Orders\`, \`Payments\`, \`Shipping\`, \`InstantBuy\`, etc.) each encapsulating its dedicated controllers, services, and models.
2. **Instant Buy One-Click Checkout**: Streamlined purchase flow eliminating redundant checkout steps while calculating shipping fees dynamically.
3. **Redis Caching & Session Acceleration**: Sub-millisecond retrieval of hot catalog items and persistent shopping cart states.
4. **Granular RBAC**: Multi-tenant administrative controls for inventory managers, dispatchers, and support agents.

### Metrics & Outcomes
- Sub-**120ms** page response times across catalog browsing.
- **35%** increase in checkout completion rates via Instant Buy.
- Seamless horizontal maintainability and decoupled deployments.
`,
  project_type: "saas",
  version: "v1.4.0",
  package_size: "Lightweight Web / Dockerized",
  platforms_json: JSON.stringify(["web"]),
  download_url: null,
  enable_live_preview: false,
  cover_image: "/uploads/projects/shop-coach-fouad.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/shopCotachFouad",
  featured: true,
  published: true,
  sort_order: 1,
  tech_json: JSON.stringify([
    "Laravel 13",
    "PHP 8.3",
    "MySQL 8",
    "Redis",
    "Modular Architecture",
    "Tailwind CSS",
    "Blade",
    "Docker"
  ]),
  type_specs_json: JSON.stringify({
    architecture_pattern: "Modular Architecture (Domain-Driven Modules)",
    modules_count: 13,
    core_modules: [
      "Catalog",
      "Cart",
      "Checkout",
      "Orders",
      "Payments",
      "Shipping",
      "Coupons",
      "InstantBuy",
      "Wishlist",
      "CMS",
      "Dashboard"
    ],
    database: "MySQL 8.0 with InnoDB Indexing",
    cache_layer: "Redis Cluster & Session Storage",
    features: [
      "الشراء الفوري بنقرة واحدة (Instant Buy)",
      "نظام الصلاحيات والأدوار متعدد المستويات (RBAC)",
      "إدارة بوالص الشحن والمناطق الجغرافية",
      "دعم متعدد اللغات والعملات"
    ]
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/shop-coach-fouad.webp",
      caption_ar: "واجهة متجر كوتش فؤاد وعرض المنتجات الرياضية",
      caption_en: "Shop Coach Fouad Storefront and Product Catalog",
      frame_type: "browser"
    }
  ])
};
