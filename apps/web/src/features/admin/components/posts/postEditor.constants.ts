import { PostCategory } from "@andev/shared";

export const CATEGORIES: Array<{ id: PostCategory; label_ar: string; label_en: string }> = [
  { id: "architecture", label_ar: "معمارية الأنظمة (Architecture)", label_en: "System Architecture" },
  { id: "performance", label_ar: "الأداء وقواعد البيانات (Databases & Performance)", label_en: "Databases & Performance" },
  { id: "security", label_ar: "الأمان والامتثال (Security & Compliance)", label_en: "Security & Compliance" },
  { id: "pos_erp", label_ar: "نقاط البيع والمؤسسات (POS & ERP Systems)", label_en: "POS & ERP Systems" },
  { id: "ai_llm", label_ar: "الذكاء الاصطناعي والأتمتة (AI & Automation)", label_en: "AI & Automation" },
  { id: "frontend", label_ar: "هندسة الواجهات الحديثة (Modern UI/UX)", label_en: "Modern UI/UX" },
  { id: "general", label_ar: "مقالات عامة وتجارب هندسية (General)", label_en: "General" }
];

export const PRESET_TAGS: string[] = [
  "PostgreSQL",
  "React 19",
  "Fastify",
  "Docker",
  "SQLite",
  "WAL Mode",
  "Redis",
  "Zod",
  "Drizzle ORM",
  "High Performance",
  "DevOps",
  "Linux Kernel"
];

