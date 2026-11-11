export const PROJECT_TYPES = [
  { value: "web", ar: "منصة ويب سحابية / SaaS", en: "Web Platform / SaaS" },
  { value: "mobile", ar: "تطبيق هواتف ذكية (iOS & Android)", en: "Mobile App (iOS & Android)" },
  { value: "pos", ar: "كاشير ونقاط بيع POS", en: "POS Point of Sale System" },
  { value: "system", ar: "نظام مؤسسي متكامل ERP / قواعد بيانات", en: "Enterprise ERP / Custom Backend" },
  { value: "desktop", ar: "برنامج مكتبي Desktop", en: "Desktop Application" },
  { value: "other", ar: "مشروع برمجي مخصص آخر", en: "Other Custom Project" },
] as const;

export const CONSULTATION_DOMAINS = [
  { value: "general", ar: "استشارة تقنية عامة وهندسة متطلبات", en: "General Technical & Requirements" },
  { value: "cloud_devops", ar: "معمارية سحابية وبنية تحتية DevOps", en: "Cloud Architecture & DevOps" },
  { value: "security_audit", ar: "تدقيق أمني واختبار اختراق وامتثال", en: "Security Audit & Compliance" },
  { value: "pos_erp", ar: "أنظمة نقاط البيع وحلول الـ ERP المؤسسية", en: "POS & Enterprise ERP Solutions" },
  { value: "ai_agent", ar: "حلول الذكاء الاصطناعي وتطبيقات LLM", en: "AI & LLM Integration" },
  { value: "performance_troubleshooting", ar: "تحسين الأداء وفحص الاختناقات البرمجية", en: "Performance & Optimization" },
] as const;

export const MEETING_MODES = [
  { value: "google_meet", ar: "مكالمة فيديو عبر Google Meet", en: "Google Meet Video Call" },
  { value: "phone", ar: "مكالمة هاتفية مباشرة", en: "Direct Phone Call" },
  { value: "in_person", ar: "جلسة حضورية في المقر (الجزائر العاصمة)", en: "In-Person Session (Algiers HQ)" },
] as const;

export const TIME_SLOTS = [
  { value: "morning", ar: "صباحية (09:00 - 12:00)", en: "Morning (09:00 - 12:00)" },
  { value: "afternoon", ar: "مسائية (13:00 - 17:00)", en: "Afternoon (13:00 - 17:00)" },
  { value: "any", ar: "أي وقت متاح", en: "Any Available Time" },
] as const;

export const INQUIRY_STATUS_OPTIONS = [
  { value: "pending", label: "معلق / قيد المراجعة (Pending)" },
  { value: "approved", label: "تمت الموافقة / الموعد مؤكد (Approved)" },
  { value: "in_progress", label: "قيد المتابعة والتنفيذ (In Progress)" },
  { value: "completed", label: "مكتمل ومسلّم (Completed)" },
  { value: "cancelled", label: "ملغى من العميل (Cancelled)" },
  { value: "rejected", label: "مرفوض / معتذر عنه (Rejected)" },
] as const;
