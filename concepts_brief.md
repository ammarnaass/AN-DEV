# EGM RFC: Standalone Bio Links Page & Admin Customizer
# وثيقة التصميم الفني: صفحة الروابط السريعة المخصصة ولوحة إدارتها

* **Status:** Draft / Under Review (EGM Phase 1: Brainstorm & RFC)
* **Author:** AN DEV Engineering
* **Date:** 2026-11-10
* **Target Route:** `/links` (Public) & `/admin/links` (Admin Dashboard)

---

## 1. ملخص الميزة والهدف (Problem Statement & Purpose)

تحتاج وكالة **AN DEV** إلى صفحة هبوط مستقلة وخفيفة مخصصة للروابط السريعة (Biolink / Link-in-Bio) لنشرها في الحسابات الرسمية على شبكات التواصل الاجتماعي (Instagram, TikTok, X, Facebook, WhatsApp Business). 

### التحدي التقني:
- الصفحة الرئيسية للموقع مصممة كبوابة متكاملة تحوي أقساماً متعددة وشريط تنقل وتذييل كامل، وهو ما لا يتناسب مع طبيعة مستخدمي شبكات التواصل على الهواتف الذكية الذين يبحثون عن إجراء فوري ومباشر (تحميل تطبيق، حجز استشارة، مراسلة واتساب، الاطلاع على أحدث مشروع).
- عدم وجود واجهة برمجية أو لوحة تحكم تتيح تخصيص روابط سريعة مع شكل وهوية بصرية مخصصة (الخطوط، الألوان، الأيقونات، الخلفيات) وتتبع معدل النقر عليها.

---

## 2. النطاق والمعمارية (System Architecture & Scope)

### أ. الصفحة العامة المستقلة (Public Standalone Page - `/links`)
صفحة ويب مستقلة تماماً بدون شريط التنقل العلوي العام أو التذييل المعقد، تركز بنسبة 100% على الروابط والتحويل:
1. **صورة مركزية بارزة (Header Hero Visual):**
   - صورة بروفايل أو شعار مربعة/دائرية كبيرة في المنتصف أعلى الصفحة مع إطار متوهج (Glow Effect) ومؤشر حالة الوكالة ("أنظمة نشطة").
   - اسم الوكالة، الشعار اللفظي، ووصف مختصر للخدمات.
2. **شريط شبكات التواصل السريع (Social Media Quick Ribbon):**
   - صف أفقي للأيقونات المباشرة (واتساب، تيليجرام، لينكد إن، فيسبوك، إنستغرام، جيت هاب، يوتيوب).
3. **حاوية الروابط المخصصة (Custom Links Stack):**
   - بطاقات أزرار تفاعلية عالية الجودة تدعم:
     - **العنوان الرئيسي والوصف الفرعي:** (Title & Subtitle).
     - **أيقونة أو صورة مخصصة:** (Icon / Thumbnail Image).
     - **نوع الخط (Typography):** خيارات محددة وسريعة للأجهزة (Cairo, IBM Plex Arabic, Tajawal, Inter, JetBrains Mono).
     - **ألوان الخط والخلفية والإطار:** (Text color, Background color/gradient, Border color).
     - **تأثيرات حركية (Hover & Pulse):** لتسليط الضوء على الروابط الهامة (Featured / High-Priority Links).
4. **تتبع النقرات الفوري (Analytics & Click Tracking):**
   - تسجيل عداد النقرات لكل رابط لحظياً عند ضغط الزائر.

---

### ب. قسم لوحة التحكم (Admin Sidebar & Builder - `/admin/links`)
إضافة عنصر جديد في القائمة الجانبية للوحة التحكم: **"صفحة الروابط (Bio Links)"**:
1. **إعدادات رأس الصفحة (Header & Identity):**
   - تغيير صورة البروفايل العلوية (رفع صورة أو رابط).
   - تعديل الاسم التعريفي والنبذة المختصرة.
   - تحديد شبكات التواصل الاجتماعي المراد إظهارها في الشريط السريع.
   - اختيار خلفية الصفحة (لون ثابت، تدرج لوني Gradient، أو صورة خلفية).
2. **مدير الروابط (Links Manager):**
   - إضافة رابط جديد (عنوان، رابط الوجهة، الوصف).
   - اختيار الأيقونة أو رفع صورة مصغرة.
   - تحديد نمط الخط، لون النص، ولون الخلفية والإطار.
   - تفعيل/تعطيل الرابط (Active Toggle).
   - إعادة ترتيب الروابط بالسحب والإفلات أو أزرار الترتيب (Sort Order).
   - حذف وتعديل الروابط مع حفظ فورى في قاعدة البيانات.
3. **معاينة حية تفاعلية لهاتف ذكي (Live Mobile Device Mockup Preview):**
   - شاشة عرض حية تمثل إطار هاتف ذكي في جانب لوحة التحكم تتفاعل لحظياً مع أي تعديل في الألوان أو الخطوط أو الروابط قبل الحفظ.
4. **إحصائيات الأداء:**
   - عرض عدد النقرات الإجمالي لكل رابط لتحديد الروابط الأكثر تحويلاً.

---

## 3. مخطط قاعدة البيانات ومسارات الـ API (Data Model & API Specification)

### جدول قاعدة البيانات الجديد (`bio_links` في PostgreSQL):
```sql
CREATE TABLE IF NOT EXISTS bio_links (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  subtitle TEXT,
  icon_or_image TEXT,
  font_family TEXT NOT NULL DEFAULT 'cairo',
  text_color TEXT NOT NULL DEFAULT '#ffffff',
  bg_color TEXT NOT NULL DEFAULT '#1e293b',
  border_color TEXT NOT NULL DEFAULT '#334155',
  style_variant TEXT NOT NULL DEFAULT 'solid', -- solid, gradient, outline, glow
  gradient_from TEXT,
  gradient_to TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### متغيرات إعدادات الصفحة في جدول `settings`:
- `bio_page_title`: اسم الصفحة التعريفي (الافتراضي: "AN DEV | وكالة البرمجيات").
- `bio_page_subtitle`: النبذة المختصرة.
- `bio_page_avatar`: رابط صورة البروفايل المركزية.
- `bio_page_bg_type`: نوع خلفية الصفحة (`color`, `gradient`, `mesh`).
- `bio_page_bg_value`: قيمة اللون أو التدرج.
- `bio_page_socials`: قائمة المنصات المفعلة (مفصولة بفواصل).

### نقاط النهاية البرمجية (API Endpoints):
- **العامة (Public):**
  - `GET /api/bio-links/public`: جلب بيانات الصفحة والروابط النشطة مرتبة حسب `sort_order`.
  - `POST /api/bio-links/:id/click`: زيادة عداد النقرات للرابط المختار.
- **الإدارية (Admin - محمية بجلسة المشرف):**
  - `GET /api/admin/bio-links`: جلب كافة الروابط بما فيها المعطلة مع إحصائيات النقرات.
  - `POST /api/admin/bio-links`: إنشاء رابط جديد.
  - `PUT /api/admin/bio-links/:id`: تعديل رابط موجود بكافة خصائص تصميمه.
  - `DELETE /api/admin/bio-links/:id`: حذف رابط.
  - `PUT /api/admin/bio-links/reorder`: تحديث ترتيب الروابط دفعة واحدة.
  - `PUT /api/admin/bio-links/settings`: حفظ إعدادات الصفحة العامة.

---

## 4. تدقيق التحديات التقنية والمفاضلات (Stress-Testing & Critical Trade-offs)

1. **المفاضلة الأولى: تحميل الخطوط المخصصة وسرعة الصفحة:**
   - *الخطر:* إذا سُمح للمشرف بإدخال أي خط عشوائي، قد يؤدي ذلك إلى تحميل ملفات خطوط ثقيلة تتسبب في وميض النص (FOUT) وبطء تحميل الصفحة على شبكات الجيل الثالث والرابع في الجزائر.
   - *الحل التقني:* اعتماد قائمة منتقاة ومحسنة من 5 خطوط عربية ولاتينية عالية الأداء (Cairo, IBM Plex Arabic, Tajawal, Inter, JetBrains Mono) محملة مسبقاً في التطبيق لضمان سرعة تحميل لحظية (< 1 ثانية).

2. **المفاضلة الثانية: هيكلية البيانات (جدول مستقل vs حقل JSON في الإعدادات):**
   - *الخطر:* وضع الروابط ككائن JSON كبير في جدول الإعدادات يتسبب في مشاكل تزامن وتضارب عند تحديث عداد النقرات من الزوار بالتزامن مع قيام المشرف بتعديل الروابط.
   - *الحل التقني:* إنشاء جدول مستقل `bio_links` للروابط يدعم العمليات الذرية (Atomic increments) ومخطط Drizzle ORM متماسك، مع بقاء الإعدادات العامة للصفحة في جدول `settings`.

3. **المفاضلة الثالثة: الرابط العام المباشر:**
   - اعتماد الرابط الثابت القياسي: `https://andev.dz/links` (مع دعم إعادة توجيه `/bio` إليه) لسهولة وضعه في خانة الموقع الشخصي على منصات التواصل.

---

## 5. خطة التنفيذ خطوة بخطوة (Step-by-Step Implementation Plan)

1. **المرحلة 1: قاعدة البيانات والمخططات:**
   - تحديث `schema.ts` و `index.ts` لإضافة جدول `bio_links` وإنشاؤه تلقائياً.
   - إنشاء مخططات التحقق في حزمة `packages/shared` (`BioLinkSchema`).
2. **المرحلة 2: خادم الـ API (Fastify):**
   - إنشاء ملف المسارات `apps/api/src/routes/bioLinks.ts` وربطه في `app.ts`.
   - كتابة اختبارات التحقق لعمليات الـ CRUD وتتبع النقرات.
3. **المرحلة 3: الواجهة العامة (`apps/web/src/pages/BioLinksPage.tsx`):**
   - تصميم واجهة هبوط سريعة جداً ومستقلة عند المسار `/links`.
   - دعم التنسيق الداكن/الفاتح، والصورة العلوية الكبيرة، وشريط التواصل، وبطاقات الروابط المصممة.
4. **المرحلة 4: لوحة التحكم الإدارية (`apps/web/src/features/admin/pages/AdminBioLinksPage.tsx`):**
   - إضافة رابط "صفحة الروابط السريعة" في القائمة الجانبية `AdminLayout.tsx` مع أيقونة مناسبة.
   - بناء شاشة الإدارة مع المعاينة الحية للهاتف الذكي (Live Device Frame).
5. **المرحلة 5: التحقق والاختبار الشامل والنشر:**
   - تشغيل اختبارات Vitest.
   - تحزيم الإنتاج والنشر على Vercel و Neon.

