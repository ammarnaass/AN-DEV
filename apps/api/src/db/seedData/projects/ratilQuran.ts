export const ratilQuranProject = {
  slug: "ratil-quran",
  title_ar: "مشروع رتل (Ratil) — مشغّل تلاوات القرآن الكريم والتحقق من النزاهة النصية",
  title_en: "Ratil - Cryptographically Verified Quran Audio & Reading Platform",
  summary_ar: "مشغّل تلاوات القرآن الكريم السحابي مع تتبع الآية وعرض النص القرآني المعتمد (روايتي حفص وورش) بدقة متناهية وبحث فوري ومطابقة ببصمة SHA-256.",
  summary_en: "Ultra-fast Quran reading and audio streaming platform with strict cryptographic SHA-256 text integrity verification, dual recitations, and sub-10ms search.",
  body_ar: `
### التحدي الهندسي
يتطلب بناء منصة تلاوة للقرآن الكريم معايير موثوقية استثنائية وغير قابلة للمساومة، حيث يجب ضمان خلو النص القرآني من أي تحريف أو خطأ إملائي بنسبة 100%، وتوفير تشغيل صوتي فوري حتى على شبكات الهاتف المتواضعة (3G) دون أي إعلانات أو تعقب، مع احترام الفروق الدقيقة بين روايتي حفص عن عاصم وورش عن نافع.

### الحل المعماري المعتمد
1. **النزاهة الرقمية المشفرة (SHA-256 Text Integrity Pipeline)**: محرك فحص آلي في خط أنابيب البناء (Build Pipeline) يقارن بصمات النصوص والمخطوطات العثمانية مع البصمات المرجعية المعتمدة ويرفض البناء تلقائياً في حال وجود أي اختلاف.
2. **الفصل المعماري التام بين الروايات**: عزل كامل لمخطوطات وتوقيتات وعدّ آيات روايتي حفص عن عاصم وورش عن نافع في طبقة البيانات والعرض.
3. **محرك بحث فوري محلي (Client-Side MiniSearch)**: فهرسة ذكية في المتصفح تتيح البحث في كامل آيات وسور القرآن الكريم بسرعة لحظية مع مطابقة التشكيل والجذور.
4. **التدفق الصوتي عبر شبكة توزيع غير متزامنة (Decoupled CDN)**: بث المقاطع الصوتية الموثقة عبر بنية Archive.org التحتية مع تخزين مؤقت استراتيجي.

### النتائج ومقاييس الأداء
- فحص رقمي صارم لسلامة النص بنسبة **100%**.
- زمن استجابة محرك البحث الفوري أقل من **10ms**.
- بدء تشغيل التلاوة الصوتية في أقل من **ثانيتين** على شبكات الجيل الثالث.
`,
  body_en: `
### Engineering Challenge
Engineering a digital Holy Quran reading and recitation platform demands absolute fidelity and zero tolerance for textual corruption, instantaneous audio streaming on limited mobile bandwidth (3G), and strict adherence to differing recitation traditions (Hafs and Warsh).

### Architectural Solution
1. **Cryptographic Integrity Verification (SHA-256)**: Continuous integration pipeline asserting deterministic cryptographic hash equivalence across all surahs prior to artifact deployment.
2. **Recitation Domain Isolation**: Complete data layer segregation for Hafs an Asim and Warsh an Nafi (verse numbering, vocal timing, and calligraphy).
3. **Sub-10ms Client Search Indexing**: MiniSearch inverted index providing instantaneous surah and ayah discovery without server latency.
4. **Decoupled Edge Audio Delivery**: Low-latency audio streaming orchestrating immutable Archive.org storage and aggressive cache policies.

### Metrics & Outcomes
- **100%** cryptographic verification of sacred texts.
- Sub-**10ms** client-side full-text search latency.
- Audio playback starts in under **2.0s** on mobile networks.
`,
  project_type: "web",
  version: "v2.1.0",
  package_size: "Ultra-fast SSR (< 85 KB gzip)",
  platforms_json: JSON.stringify(["web"]),
  download_url: null,
  enable_live_preview: true,
  cover_image: "/uploads/projects/ratil-quran.webp",
  live_url: "https://ratil-quo9.vercel.app",
  repo_url: "https://github.com/ammarnaass/ratil",
  featured: true,
  published: true,
  sort_order: 4,
  tech_json: JSON.stringify([
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Neon PostgreSQL",
    "Tailwind CSS",
    "MiniSearch",
    "Archive.org CDN",
    "SHA-256 Text Integrity"
  ]),
  type_specs_json: JSON.stringify({
    canonical_text_integrity: "Automated SHA-256 build verification for all surahs",
    recitation_variants: "Strict separation for Hafs an Asim & Warsh an Nafi",
    search_engine: "Client-side MiniSearch indexing with instantaneous lookup",
    audio_delivery: "Decoupled CDN streaming via Archive.org infrastructure",
    privacy_policy: "Zero ads, zero trackers, pure respectful experience",
    target_latency: "Time to first audio stream ≤ 2s on 3G mobile networks"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/ratil-quran.webp",
      caption_ar: "واجهة مشغل رتل للقرآن الكريم",
      caption_en: "Ratil Quran Audio Player Interface",
      frame_type: "browser"
    }
  ])
};
