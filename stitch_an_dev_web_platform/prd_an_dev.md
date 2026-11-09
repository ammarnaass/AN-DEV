# PRD موقع AN DEV (الإصدار 1.0)
الشعار: Code · Create · Solve
المعمارية: Vite + React + Fastify + SQLite (Drizzle ORM)
المقر: الجزائر

## ملخص النطاق
1. الموقع العام (RTL عربي / EN إنجليزي):
   - الرئيسية (Hero, ماذا نبني, أعمال مختارة, التقنيات, مراحل العمل, CTA)
   - معرض الأعمال /projects مع الفلاتر
   - صفحة تفاصيل المشروع /projects/:slug
   - طلب مشروع /contact (نموذج متكامل مع بيانات التواصل)
   - المدونة /blog
2. لوحة الإدارة /admin:
   - تسجيل الدخول /admin/login
   - نظرة عامة (Dashboard stats & metrics)
   - إدارة المشاريع /admin/projects
   - إدارة الطلبات /admin/inquiries
   - إعدادات الموقع /admin/settings

## نظام التصميم (Tokens)
- Background: #050816 (Dark default), Surface: #0B1430, Line: #1A2850
- Text: #E6E6E6, Muted: #8D99B3
- Primary: #0D6EFD, Accent: #00C3FF, Status: Ok/Warn/Err
- خط Cairo للعربية، Poppins/Inter للإنجليزية، Monospace لأكواد النافذة الطرفية.
