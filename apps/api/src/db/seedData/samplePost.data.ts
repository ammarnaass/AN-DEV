export const samplePost = {
  slug: "building-high-performance-apps-in-algeria",
  title_ar: "هندسة تطبيقات الويب فائقة الأداء للشبكات الجزائرية",
  title_en: "Engineering High-Performance Web Applications for Algerian Networks",
  summary_ar: "تحليل معماري لاستراتيجيات التخزين المؤقت، ضغط الوسائط الحديثة (WebP)، وتقليل الحزم لتقديم تجربة تصفح فورية في بيئات الشبكات المتفاوتة.",
  summary_en: "Architectural analysis of edge caching, next-gen WebP compression, and bundle minification tailored for variable mobile network conditions across Algerian provinces.",
  category: "architecture",
  tags_json: JSON.stringify(["Performance", "Next.js", "WebP", "Caching", "Edge"]),
  cover_image: "/uploads/projects/anpos.webp",
  author_name: "عمار ناعس",
  author_role: "Senior Systems Architect",
  reading_time_minutes: 6,
  featured: true,
  body_md_ar: `
في AN DEV، نعتبر أداء الويب ليس مجرد ميزة إضافية، بل ميزة تنافسية حاسمة. عند بناء منصات للجمهور في الجزائر، يجب مراعاة تفاوت سرعات شبكات الهاتف المحمول (3G/4G) بين مختلف الولايات.

### 1. استراتيجيات ضغط الوسائط الحديثة (WebP)
الصور تشكل عادة أكثر من 70% من حجم الصفحة. من خلال التحويل التلقائي إلى WebP مع الحفاظ على جودة 85%:
- ينخفض حجم الصور بمعدل 65% إلى 80%.
- ينخفض وقت التحميل الأولي (FCP) إلى أقل من ثانية واحدة.

### 2. تقسيم الكود على مستوى المسارات (Route-Based Code Splitting)
تحميل المكونات الضرورية فقط للصفحة الحالية دون تحميل مكتبات ثانوية.
`,
  body_md_en: `
At AN DEV, web performance is a core competitive requirement rather than an afterthought. When designing digital solutions for the Algerian market, varying mobile network speeds across provinces must be accommodated.

### Key Architectural Approaches:
1. **Modern Compressed Media (WebP)**: Reducing image payloads by 70% without perceptual fidelity loss.
2. **Route-Level Code Splitting**: Loading components on-demand.
3. **Immutable Caching Headers**: Serving static assets directly from edge reverse proxies.
`
};
