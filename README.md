# AN DEV

<div align="center">
  <img src="apps/web/public/logo.svg" alt="AN DEV Logo" width="160" />
  <h3>Code · Create · Solve</h3>
  <p><b>المنصة الرقمية ومعرض الأعمال ولوحة التحكم الرسمية لشركة AN DEV للبرمجيات (الجزائر).</b></p>
  <p><i>Official digital platform, portfolio showcase, and administration dashboard for AN DEV software engineering agency (Algeria).</i></p>
</div>

---

## 🌟 نظرة عامة | Overview

منصة ويب متكاملة مبنية بأحدث تقنيات الويب، تدعم اللغتين العربية (RTL افتراضياً) والإنجليزية (LTR)، مع واجهة عامة عصرية تفاعلية، ولوحة إدارة محمية بالكامل للتحكم بالمشاريع والطلبات والمقالات والإعدادات، وقاعدة بيانات محلية خفيفة وسريعة (SQLite في وضع WAL).

---

## 🛠️ المعمارية والتقنيات | Architecture & Tech Stack

المشروع مبني بهيكلية **Monorepo** باستخدام npm workspaces:

- **`packages/shared`**: حزمة مشتركة للمخططات ونماذج البيانات والتحقق باستخدام **Zod** و**TypeScript**.
- **`apps/api`**: خادم واجهة برمجة التطبيقات (API) مبني بـ **Fastify**:
  - قاعدة بيانات **SQLite** عبر `better-sqlite3` و **Drizzle ORM** بوضع WAL عالي التزامن.
  - تشفير كلمات المرور وتأمين الجلسات باستخدام **Argon2id** وكوكيز آمنة `HttpOnly`.
  - معالجة ورفع الصور وضغطها تلقائياً إلى صيغة **WebP** عبر `sharp`.
  - حماية استمارة استقبال الطلبات عبر مصيدة سبام (**Honeypot**) ومحدد معدل طلبات (**Rate Limiting**) مشفر بـ SHA-256.
- **`apps/web`**: واجهة مستخدم حديثة وسريعة مبنية بـ **React 19** و **Vite**:
  - تنسيق ونظام تصميم مخصص باستخدام **Tailwind CSS**.
  - دعم ثنائية اللغة التلقائية (العربية / الإنجليزية).
  - وضع داكن افتراضي وتلقائي مع إمكانية التبديل للوضع الفاتح.
  - إدارة الحالة وجلب البيانات عبر **TanStack Query**.
  - تنقل سريع عبر **React Router v7**.
  - وسم محركات البحث ودعم المشاركة عبر شبكات التواصل (Open Graph و Twitter Cards) وملف `sitemap.xml`.

---

## 🚀 البدء السريع | Getting Started

### 1. تثبيت الاعتماديات (Install Dependencies):
```bash
npm install
```

### 2. تعبئة قاعدة البيانات الأولية (Seed Database):
تقوم هذه الخطوة بإنشاء قاعدة بيانات SQLite في `data/andev.db` وتعبئتها بـ 6 مشاريع واقعية وحساب المدير:
```bash
npm run seed
```

### 3. تشغيل بيئة التطوير (Run Development):
يمكنك تشغيل الخادم والواجهة معاً عبر السكربت المخصص:
```bash
./scripts/dev.sh
```

أو تشغيلهما كل على حدة:
```bash
# تشغيل خادم API (المنفذ 3001)
npm run dev:api

# تشغيل واجهة المتصفح (المنفذ 3000 مع Proxy تلقائي)
npm run dev:web
```

- الواجهة العامة: `http://localhost:3000`
- لوحة التحكم: `http://localhost:3000/admin/login`

### 4. بيانات تسجيل الدخول الافتراضية للمدير (Admin Credentials):
- **البريد الإلكتروني:** `ammar@andev.dz`
- **كلمة المرور:** `admin123456`

---

## 🧪 الاختبارات والبناء للإنتاج | Tests & Production Build

### تشغيل كافة الاختبارات (Vitest):
```bash
npm test
```
*(تم اجتياز جميع اختبارات الوحدات والمسارات واختبار التكامل الشامل E2E بنسبة 100%)*

### بناء الإنتاج (Production Build):
```bash
npm run build
```

---

## 🌐 النشر والاستضافة السحابية | Deployment

المنصة مهيأة بالكامل للنشر الفوري على **Vercel** بالربط مع قاعدة بيانات **Neon (PostgreSQL)** السحابية.

📖 **للاطلاع على الدليل الكامل خطوة بخطوة وإعداد المتغيرات البيئية، راجع ملف [دليل النشر والاستضافة](DEPLOYMENT.md).**

---

## 📁 هيكلية المستودع | Repository Structure

```text
AN DEV/
├── apps/
│   ├── api/                  # Fastify backend, Drizzle ORM, SQLite & Auth
│   └── web/                  # Vite + React 19 Frontend & Admin SPA
├── data/                     # SQLite database files (andev.db in WAL mode)
├── docs/                     # Specifications, PRD & Architecture designs
├── packages/
│   └── shared/               # Shared Zod schemas & TypeScript types
├── scripts/                  # Helper CLI scripts (dev.sh, build.sh)
└── tests/
    └── e2e/                  # End-to-end integration test suite
```

---

## 📄 الترخيص | License

جميع الحقوق محفوظة © **AN DEV** · الجزائر.
*(Code · Create · Solve)*

