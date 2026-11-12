export const wasellWhatsappStoreProject = {
  slug: "wasell-whatsapp-store",
  title_ar: "WaSell (واسل) — منصة المتجر والرد الآلي والتسويق عبر واتساب",
  title_en: "WaSell - AI WhatsApp Commerce & Marketing Automation Platform",
  summary_ar: "منصة سطح مكتب متكاملة لإدارة المتاجر الإلكترونية، وأتمتة الردود والمبيعات وإطلاق الحملات عبر واتساب بربط مزدوج ووكيل ذكاء اصطناعي.",
  summary_en: "All-in-one conversational commerce desktop suite powering automated sales, CRM, and marketing campaigns via WhatsApp dual-engine architecture.",
  body_ar: `
### التحدي الهندسي
المتاجر الإلكترونية وأصحاب المشاريع الرقمية يواجهون صعوبة بالغة في متابعة آلاف محادثات الزبائن المتزامنة على تطبيق واتساب، مما يؤدي إلى تأخر الردود وضياع الصفقات، بالإضافة إلى مخاطر حظر الحسابات عند استخدام أدوات المراسلة العشوائية وتشتت بيانات الطلبات خارج نظام المتجر.

### الحل المعماري المعتمد
1. **محرك الربط المزدوج (Dual-Engine Architecture)**: دعم بوابة **OpenWA** المحلية عبر مسح رمز QR بدون تكاليف إضافية، مع دعم سحابة **Meta WhatsApp Cloud API** الرسمية للأحجام الكبيرة والمؤسسات.
2. **وكيل المبيعات الذكي ومحاكاة السلوك البشري**: روبوت محادثة تفاعلي يحلل نية العميل ويقترح المنتجات مع محاكاة الكتابة الحية (\`SIMULATE_TYPING\`) وخوارزمية وتيرة مكافحة الحظر (\`Anti-Ban Pacing\`).
3. **صندوق الوارد الموحد ثلاثي الأقسام (Triple-Pane Inbox)**: إدارة قائمة المحادثات، تدفق الدردشة مع بطاقات الشراء التفاعلية، وبيانات العميل وسلته الحية في شاشة واحدة.
4. **الربط مع منصات التجارة الإلكترونية**: كتالوج تفاعلي ومزامنة مع منصات التجارة (سلة، زد، شوبيفاي) وتوليد روابط الدفع الفورية.

### النتائج ومقاييس الأداء
- استجابة فورية بنسبة **100%** لرسائل واستفسارات العملاء على مدار الساعة.
- خفض معدل التخلي عن إتمام الطلب بنسبة **45%** بفضل الشراء الفوري داخل المحادثة.
- حماية حسابات واتساب من الحظر بفضل خوارزمية التحكم بالوتيرة الذكية.
`,
  body_en: `
### Engineering Challenge
E-commerce businesses struggle to manage high-volume customer inquiries across WhatsApp simultaneously, suffering from response delays, lost transactions, and account bans triggered by uncalibrated broadcast scripts.

### Architectural Solution
1. **Dual-Engine WhatsApp Integration**: Hybrid connectivity orchestrating open-source local OpenWA QR sessions alongside official enterprise Meta WhatsApp Cloud API webhooks.
2. **AI Sales Agent with Anti-Ban Pacing**: Context-aware natural language assistant presenting interactive product cards, human typing simulation, and dynamic message pacing.
3. **Triple-Pane Unified Inbox**: Cohesive interface consolidating thread navigation, interactive messaging, and real-time cart/customer CRM attributes.
4. **E-Commerce Catalog Sync**: Seamless bi-directional synchronization with modern storefronts and automated instant checkout payment link generation.

### Metrics & Outcomes
- **100%** instantaneous response uptime on initial customer queries.
- **45%** reduction in checkout abandonment via conversational sales workflows.
- Zero account bans observed under sustained peak messaging volumes.
`,
  project_type: "desktop",
  version: "v1.2.0",
  package_size: "78 MB Standalone Installer",
  platforms_json: JSON.stringify(["windows", "linux", "web"]),
  download_url: "https://github.com/ammarnaass/whatsapp-store-bot-marketing/releases",
  enable_live_preview: false,
  cover_image: "/uploads/projects/wasell-whatsapp-store.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/whatsapp-store-bot-marketing",
  featured: true,
  published: true,
  sort_order: 6,
  tech_json: JSON.stringify([
    "Electron",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "SQLite (better-sqlite3)",
    "OpenWA",
    "Meta WhatsApp Cloud API",
    "AI Sales Agent"
  ]),
  type_specs_json: JSON.stringify({
    architecture_mode: "Dual-Engine Architecture (OpenWA Local QR + Official Meta Cloud API)",
    ai_engine: "Conversational Sales Agent with Human Simulation Typing & Anti-Ban Pacing",
    inbox_ui: "Triple-Pane Unified Inbox (Conversations, Chat Stream with Buy Cards, Live Cart & CRM)",
    catalog_integration: "Interactive Catalog & E-Commerce Synchronization with Instant Payment Links",
    storage_security: "Local SQLite WAL Mode with AES-256 Encrypted Session Storage"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/wasell-whatsapp-store.webp",
      caption_ar: "لوحة تحكم منصة واسل وصندوق الوارد الموحد",
      caption_en: "WaSell Platform Dashboard & Unified Triple-Pane Inbox",
      frame_type: "desktop"
    }
  ])
};

