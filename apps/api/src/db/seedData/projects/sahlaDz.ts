export const sahlaDzProject = {
  slug: "sahla-dz",
  title_ar: "سهلة · Sahla 🇩🇿 — منصة الخدمات الرقمية والوثائق لمكاتب الخدمات والكيوسك",
  title_en: "Sahla DZ - Micro-Services & Digital Documents Platform for Kiosks",
  summary_ar: "منصة خدمات رقمية B2B2C لأصحاب الكيوسكات، المكتبات، ومقاهي الإنترنت في الجزائر لإنجاز الوثائق الرسمية، السير الذاتية، الفواتير، ونظام شحن النقاط المرن بالذكاء الاصطناعي.",
  summary_en: "B2B2C SaaS powering document synthesis, Algerian tax invoicing, and biometric photo processing for cybercafés and kiosks with flexible points wallet.",
  body_ar: `
### التحدي الهندسي
مقاهي الإنترنت، مكاتب الأعمال (Bureautique)، والكيوسك في الجزائر تقضي ساعات طويلة يومياً في تحرير السير الذاتية وتنسيق صور الهوية وملء الاستمارات الحكومية وإعداد الفواتير التجارية لزبائنها، مع صعوبة حساب تكلفة الخدمة، وغياب الأدوات الرقمية المؤتمتة المتوافقة مع معايير الإدارة والضرائب الجزائرية.

### الحل المعماري المعتمد
1. **نموذج أعمال وخدمات متناهية الصغر (B2B2C Micro-Services)**: منصة سحابية تتيح للعامل أو صاحب المحل إنجاز معاملات الزبائن في دقائق بمعدل ربح يحدده بنفسه.
2. **محفظة النقاط والشحن الذري (Atomic Wallet Engine)**: نظام نقاط مرن بدون اشتراكات شهرية، يدعم الشحن ببطاقات التعبئة المادية (Scratch Cards) والدفع الرقمي عبر بريدي موب (BaridiMob) والبطاقة الذهبية / CIB.
3. **الذكاء الاصطناعي ومعالجة الوثائق (Gemini AI Vision & OCR)**: استخراج بيانات السير الذاتية القديمة آلياً، وتوليد صور الهوية بالمقاسات البيومترية الرسمية (35×45 مم) مع شبكة طباعة فورية.
4. **الفواتير النظامية والمطابقة الجبائية**: فواتير متوافقة تماماً مع القانون التجاري والجبائي الجزائري (NIF, NIS, RC, Article d'imposition, TVA, Timbre Fiscal) مع تفقيط المبالغ بالحروف عربياً وفرنسياً.
5. **جسر الهاتف للحاسوب (Phone-to-PC Bridge)**: مسح رمز QR من هاتف الزبون لإرسال الملف المولد فوراً للطباعة دون الحاجة لفتح الحساب على أجهزة متعددة.

### النتائج ومقاييس الأداء
- تقليص زمن إعداد وطباعة الوثائق الرسمية من 30 دقيقة إلى أقل من **3 دقائق**.
- مطابقة جبائية وقانونية بنسبة **100%** للفواتير والاستمارات.
- زيادة هوامش أرباح أصحاب المحلات ومقاهي الإنترنت بنسبة **40%**.
`,
  body_en: `
### Engineering Challenge
Cybercafés and public document service shops in Algeria expend extensive manual labor typing resumes, formatting passport photos, and issuing tax invoices without structured workflow automation or standardized pricing tools.

### Architectural Solution
1. **B2B2C Micro-Services Architecture**: Cloud SaaS empowering shop clerks to draft, generate, and sell custom documents on-demand.
2. **Atomic Points Wallet & Scratch Cards**: Pay-as-you-go credit architecture supporting offline scratch card redemption, BaridiMob, and Edahabia/CIB gateways.
3. **Gemini Vision OCR & Biometric Engine**: Automated legacy CV digitization and compliant 35x45mm ID portrait sheet synthesis for immediate desk printing.
4. **Algerian Commercial & Tax Invoicing**: Native algorithmic support for Algerian fiscal identifiers (NIF, NIS, RC, Tax Article, VAT, Stamp Duty) with bilingual word amount transcription.
5. **QR Phone-to-PC Bridge**: Ephemeral secure QR protocol bridging customer smartphones directly to store printing workstations without credentials sharing.

### Metrics & Outcomes
- Document turnaround time reduced from 30 minutes to under **3 minutes**.
- **100%** fiscal compliance across Algerian commercial invoice schemas.
- **40%** increase in retail desk service profit margins.
`,
  project_type: "saas",
  version: "v1.3.0",
  package_size: "Cloud SaaS / PWA",
  platforms_json: JSON.stringify(["web"]),
  download_url: null,
  enable_live_preview: false,
  cover_image: "/uploads/projects/sahla-dz.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/Sahla-",
  featured: true,
  published: true,
  sort_order: 9,
  tech_json: JSON.stringify([
    "Next.js 14",
    "React 18",
    "Tailwind CSS",
    "Prisma ORM",
    "PostgreSQL",
    "Google Gemini AI",
    "HTML-to-PDF 300DPI",
    "Redis"
  ]),
  type_specs_json: JSON.stringify({
    business_model: "B2B2C Micro-Services Platform for Cybercafés, Kiosks & Bureautique shops",
    wallet_system: "Atomic Points Deduction System with physical Scratch Cards & BaridiMob integration",
    pdf_synthesis: "High-Resolution 300 DPI Rendering Engine for Algerian Official Forms & Badges",
    ai_vision_ocr: "Google Gemini Vision for Resume extraction and 35x45mm Biometric ID photo processing",
    phone_to_pc_bridge: "Instant QR-based Phone-to-PC Bridge transferring print files without login friction",
    tax_compliance: "Strict Algerian Invoicing Standards (NIF, NIS, RC, Article d'imposition, TVA, Timbre)"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/sahla-dz.webp",
      caption_ar: "لوحة تحكم منصة سهلة للخدمات الرقمية وأدوات المحلات",
      caption_en: "Sahla DZ Digital Services Dashboard & Kiosk Tools",
      frame_type: "browser"
    }
  ])
};

